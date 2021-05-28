const knex = require('../../data/db');
const { v4: uuidv4 } = require('uuid');
const { DateTime } = require('luxon');

module.exports = {
  scheduleMeals: async function(user, requestBody, res) {
    try {
      if (user.user_type !== 'Cook') {
        throw new Error('Only cooks can schedule meals.');
      }
      if (user.approved === false) {
        throw new Error(
          'Cook not yet approved. Please contact support or a volunteer'
        );
      }

      if (!requestBody || requestBody.length === 0) {
        throw new Error('Missing request body with dates of scheduled meals.');
      }
      const startDate = DateTime.fromISO(requestBody[0].date, {
        zone: 'Asia/Kolkata',
      });
      const endDate = DateTime.fromISO(
        requestBody[requestBody.length - 1].date,
        {
          zone: 'Asia/Kolkata',
        }
      );
      if (startDate > endDate) {
        throw new Error(
          ' Dates of the scheduled meals are not given in ascending order.'
        );
      }
      // Check if startDate occurs only 2 days after the current date.
      const twoDaysFromToday = DateTime.fromObject({
        zone: 'Asia/Kolkata',
      })
        .startOf('day')
        .plus({ days: 2 });
      if (startDate < twoDaysFromToday) {
        throw new Error(
          'Cooks cannot change meals for today or tomorrow. Check the provided start date for the scheduled meals.'
        );
      }

      // Delete meals provided within the given date range.
      await knex.transaction(async (tr) => {
        await tr('meal')
          .whereBetween('scheduled_for', [startDate, endDate])
          .andWhere('cook_id', user.id)
          .del();
        // Insert meals provided within the given date range
        // Loop over the provided array of scheduled meals.
        for (const scheduledMeal of requestBody) {
          // For each array item, prepare a meal row you can insert into the DB.
          const meal = {};
          meal.cook_id = user.id;
          meal.scheduled_for = DateTime.fromISO(scheduledMeal.date, {
            zone: 'Asia/Kolkata',
          });
          // Insert the row into the meal table 'x' no. of times, where x is the no, of meals scheduled by the cook for that date.
          for (let i = 0; i < scheduledMeal.number_of_meals; i++) {
            meal.id = uuidv4();
            await tr('meal').insert(meal);
          }
        }
      });
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  mealsReady: async function(decodedUser, res) {
    try {
      if (!decodedUser) {
        throw new Error('Invalid user');
      } else if (decodedUser.user_type != 'Cook') {
        throw new Error('User type is not allowed to set meals as ready.');
      }
      if (decodedUser.approved === false) {
        throw new Error(
          'Cook not yet approved. Please contact support or a volunteer'
        );
      }

      let getCookAddress = knex
        .select(
          'address.house_number',
          'address.building_name',
          'address.first_line',
          'address.second_line',
          'address.city',
          'address.zipcode',
          'address.state'
        )
        .from('address')
        .where('address.user_id', '=', decodedUser.id);

      let cookAddress = await getCookAddress;
      if (!cookAddress || cookAddress.length == 0) {
        throw new Error('Error while fetching cook address details.');
      }

      // Update all of today's scheduled meals to ready.
      const updateResult = await knex('meal')
        .where({
          cook_id: decodedUser.id,
          scheduled_for: DateTime.now().setZone('Asia/Kolkata'),
          ready: false,
        })
        .update({ ready: true }, ['patient_id']);

      if (updateResult.length === 0) {
        throw new Error(
          'No meals available for today, or meals have already been marked as ready.'
        );
      }

      // Consolidate the patients with the no. of meals each one has ordered from the current cook.
      const patientsToNumMeals = {};
      for (const patient of updateResult) {
        if (!(patient.patient_id in patientsToNumMeals)) {
          patientsToNumMeals[patient.patient_id] = 0;
        }
        patientsToNumMeals[patient.patient_id]++;
      }

      const allPatientDetails = {};
      for (const patientId in patientsToNumMeals) {
        let patientDetails = await knex('user')
          .select('phone_number', 'first_name', 'last_name')
          .where('id', patientId)
          .first();
        allPatientDetails[patientId] = patientDetails;
        await sendPatientWhatsapp(
          patientDetails,
          patientsToNumMeals[patientId],
          decodedUser,
          cookAddress
        );
      }

      await sendCookWhatsapp(decodedUser, allPatientDetails);

      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

async function sendCookWhatsapp(decodedUser, allPatientDetails) {
  let patientStr = '',
    i = 1;
  for (const patientId in allPatientDetails) {
    patientStr +=
      i +
      '. ' +
      allPatientDetails[patientId].first_name +
      ' ' +
      allPatientDetails[patientId].last_name +
      '\nPhone number: ' +
      allPatientDetails[patientId].phone_number +
      '\n\n';
    i++;
  }

  var accountSid = process.env.TWILIO_ACCOUNT_SID;
  var authToken = process.env.TWILIO_AUTH_TOKEN;

  var twilio = require('twilio');
  var client = new twilio(accountSid, authToken);
  client.messages.create({
    from: 'whatsapp:' + process.env.WHATSAPP_BUSINESS_ACCOUNT_NUMBER,
    body:
      'Hi! Thank you so much for volunteering with Recipe of Hope. The following recipients will send a delivery executive from Swiggy Genie/Dunzo to pick up food from your address: \n\n' +
      patientStr +
      'The recipients may call/whatsapp you to ensure smooth delivery of meals. Please reach out to a Recipe of Hope volunteer if you have any further questions.\n\nThanks!\nRecipe of Hope Team',
    to: 'whatsapp:+91' + decodedUser.phone_number,
  });
}

async function sendPatientWhatsapp(
  patientDetails,
  numMeals,
  decodedUser,
  cookAddress
) {
  var accountSid = process.env.TWILIO_ACCOUNT_SID;
  var authToken = process.env.TWILIO_AUTH_TOKEN;
  var twilio = require('twilio');
  var client = new twilio(accountSid, authToken);
  client.messages.create(
    {
      from: 'whatsapp:' + process.env.WHATSAPP_BUSINESS_ACCOUNT_NUMBER,
      body:
        "Hi! We hope you're hungry because your food is ready.\n \nYour cook details are:\n\nName: " +
        decodedUser.first_name +
        ' ' +
        decodedUser.last_name +
        '\nPhone number: ' +
        decodedUser.phone_number +
        '\nAddress: ' +
        cookAddress[0].house_number +
        ', ' +
        cookAddress[0].building_name +
        ',\n' +
        cookAddress[0].first_line +
        ',\n' +
        cookAddress[0].second_line +
        '\n' +
        cookAddress[0].city +
        ' - ' +
        cookAddress[0].zipcode +
        '\n' +
        cookAddress[0].state +
        '\n \nThe cook has prepared the *' +
        numMeals +
        '* meal(s) you requested. Please set up Dunzo/Swiggy Genie to get your food picked up.\n \nHappy eating and get well soon!\nRecipe of Hope Team',
      to: 'whatsapp:+91' + patientDetails.phone_number,
    }.then((message) => console.log(message.sid))
  );
}
