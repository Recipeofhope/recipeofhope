const knex = require('../../data/db');
const { v4: uuidv4 } = require('uuid');
const { getMealsForTomorrow } = require('../common');
const { DateTime } = require('luxon');
const httpConstants = require('http2').constants;

module.exports = {
  getMeals: async function(patient, res) {
    try {
      const invalidUserErrorMessage =
        'Only Recipients are allowed to book meals.';
      validatePatient(patient, invalidUserErrorMessage);
      const currentIndianDate = DateTime.now().setZone('Asia/Kolkata');
      if (currentIndianDate.hour >= 20) {
        throw new Error(
          'Meals unavailable after 8 PM. Consider joining the waitlist.'
        );
      }
      let resultMeals = await getMealsForTomorrow();
      if (!resultMeals) {
        throw new Error('Error while fetching meal details.');
      }
      if (resultMeals.length === 0) {
        throw new Error('JOIN_WAITLIST');
      }

      //Getting cook details for available meals.

      //Get all cook details.
      let getCooksQuery = knex
        .select(
          'user.id',
          'user.first_name',
          'user.last_name',
          'address.locality_id',
          'locality.name'
        )
        .from('user')
        .join('address', 'user.id', '=', 'address.user_id')
        .join('locality', 'address.locality_id', '=', 'locality.id')
        .where('user.user_type', '=', 'Cook');

      let resultCooks = await getCooksQuery;

      //Final list of available meals from cooks.
      if (!resultCooks) {
        throw new Error('Error while fetching available meals.');
      }
      if (resultCooks.length === 0) {
        throw new Error('No cooks available at the moment.');
      }

      for (let i = 0; i < resultMeals.length; i++) {
        for (let j = 0; j < resultCooks.length; j++) {
          if (
            resultMeals[i].cook_id.toString() === resultCooks[j].id.toString()
          ) {
            resultMeals[i].cook_name =
              resultCooks[j].first_name + ' ' + resultCooks[j].last_name;
            resultMeals[i].locality_id = resultCooks[j].locality_id;
            resultMeals[i].locality_name = resultCooks[j].name;
          } else continue;
        }
      }

      // Sort list - near and far.

      //Get location details of patient.

      let getUserLocalityQuery = knex
        .select('address.locality_id')
        .from('address')
        .where('address.user_id', '=', patient.id);

      let userLocationDetails = await getUserLocalityQuery;

      if (!userLocationDetails) {
        throw new Error('Error while fetching location details of patient.');
      }
      if (userLocationDetails.length === 0) {
        throw new Error('No address present for patient.');
      }

      // Get service areas of patient location.

      let getServiceAreas = knex
        .select('service_areas.service_area_id')
        .from('service_areas')
        .where(
          'service_areas.locality_id',
          '=',
          userLocationDetails[0].locality_id
        );

      let serviceAreas = await getServiceAreas;

      if (!serviceAreas || serviceAreas.length == 0) {
        throw new Error(
          'Error while fetching service areas of patient location.'
        );
      }

      // Compare cook locations with service areas of patient location. If match, nearby set to true.

      for (let i = 0; i < resultMeals.length; i++) {
        for (let j = 0; j < serviceAreas.length; j++) {
          if (
            resultMeals[i].locality_id.toString() ===
            serviceAreas[j].service_area_id.toString()
          ) {
            resultMeals[i].nearby = true;
            break;
          } else resultMeals[i].nearby = false;
        }
      }
      res.status(200).json(resultMeals);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getBookedMeals: async function(patient, res) {
    try {
      const invalidUserErrorMessage = 'Only Recipients can book meals.';
      validatePatient(patient, invalidUserErrorMessage);

      // Get all meals scheduled for this patient, for today and tomorrow.
      const todayMidnight = DateTime.fromObject({
        zone: 'Asia/Kolkata',
      }).startOf('day');
      const tomorrowMidnight = todayMidnight.plus({ days: 1 });
      let bookedMealsQueryResult = await knex
        .select('cook_id', 'scheduled_for')
        .count('id')
        .from('meal')
        .where('patient_id', patient.id)
        .andWhere('cancelled', false)
        .whereBetween('scheduled_for', [todayMidnight, tomorrowMidnight])
        .groupBy('cook_id', 'scheduled_for');
      const bookedMeals = await getFormattedBookedMealsResponse(
        bookedMealsQueryResult
      );
      res
        .status(httpConstants.HTTP_STATUS_OK)
        .json(Object.fromEntries(bookedMeals));
    } catch (error) {
      res
        .status(httpConstants.HTTP_STATUS_BAD_REQUEST)
        .json({ message: error.message });
    }
  },

  bookMeals: async function(patient, requestBody, res) {
    try {
      const invalidUserErrorMessage =
        'Only Recipients are allowed to book meals.';
      validatePatient(patient, invalidUserErrorMessage);
      if (!requestBody || requestBody.length === 0) {
        throw new Error('Missing request body with booking details.');
      }

      const tomorrow = DateTime.fromObject({
        zone: 'Asia/Kolkata',
      })
        .startOf('day')
        .plus({ days: 1 });
      await mealBookingTimeCheck();

      await knex.transaction(async (tr) => {
        let success = 0;
        let totalMeals = 0;

        //Getting all available meals for cook IDs sent by the patient.

        for (let i = 0; i < requestBody.length; i++) {
          let resultMeals = await tr
            .select('meal.id')
            .from('meal')
            .where('meal.scheduled_for', '=', tomorrow)
            .whereNull('meal.patient_id')
            .where('cook_id', '=', requestBody[i].cook_id);

          if (!resultMeals || resultMeals.length == 0) {
            throw new Error('Error while fetching meal details.');
          }

          // Updating patient ID to user ID for the number of meals sent by the patient for each cook selected.

          for (let j = 0; j < requestBody[i].number_of_meals; j++) {
            var result = await tr('meal')
              .update({ patient_id: patient.id })
              .where('meal.id', '=', resultMeals[j].id);
            success += result;
          }

          totalMeals += requestBody[i].number_of_meals;
        }

        if (success === totalMeals)
          res.status(200).json({ message: 'Success! All meals booked.' });
        //return Json('Success! All meals booked.');
        else if (success > 0 && success < totalMeals)
          res.status(200).json({
            message:
              'Some meals booked successfully. Please check which cook/ meals were booked and try again.',
          });
        else if (success == 0)
          throw new Error(
            'Oops, something failed! Sorry, but your meals were not booked. Please try again and contact support if the problem persists!'
          );
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  cancelMeal: async function(patient, reqBody, res) {
    try {
      const invalidUserErrorMessage =
        'Only Recipients are allowed to book meals.';
      validatePatient(patient, invalidUserErrorMessage);
      const cookId = reqBody.cook_id;
      const mealScheduledFor = reqBody.scheduled_for;
      const mealScheduledForDate = DateTime.fromISO(mealScheduledFor, {
        zone: 'Asia/Kolkata',
      });

      // Get all meals, which have the given patients id and the given cook's id.
      const todayMidnight = DateTime.fromObject({
        zone: 'Asia/Kolkata',
      }).startOf('day');
      const meals = await knex
        .select('id', 'patient_id', 'scheduled_for', 'cancelled')
        .from('meal')
        .where({ cook_id: cookId, patient_id: patient.id })
        .andWhere('scheduled_for', mealScheduledForDate);

      if (!meals || meals.length === 0) {
        throw new Error(
          'No meals to cancel for this cook for the given recipient.'
        );
      }

      const currentIndianDate = DateTime.now().setZone('Asia/Kolkata');
      const tomorrowMidnight = DateTime.fromObject({
        zone: 'Asia/Kolkata',
      })
        .plus({ days: 1 })
        .startOf('day');

      // get the user details fresh from the DB.
      const dbPatientUser = await knex('user')
        .select('phone_number', 'first_name', 'last_name', 'approved')
        .where('id', patient.id)
        .first();

      if (mealScheduledForDate.toMillis() === todayMidnight.toMillis()) {
        if (currentIndianDate.hour <= 12) {
          markMealsAsCancelled(meals, res, dbPatientUser, cookId);
          return;
        } else {
          throw new Error(
            'Meals scheduled for today cannot be cancelled after 12 PM.'
          );
        }
      } else if (
        mealScheduledForDate.toMillis() === tomorrowMidnight.toMillis()
      ) {
        if (currentIndianDate.hour >= 20) {
          await markMealsAsCancelled(meals, res, dbPatientUser, cookId);
          return;
        } else {
          // If the meals being cancelled are for tomorrow and current India time is < 8 PM, remove the patient ID from the meal, thus releasing it back to the list of meals returns by the book meals API.
          await removePatientIdFromMeals(meals, res);
          return;
        }
      }
      // If we've reached here, the scheduled_for date provided is invalid.
      throw new Error('Meals cannot be cancelled at the given date');
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  waitlistPatient: async function(patient, reqBody, res) {
    try {
      const invalidUserErrorMessage = 'Only patients can join the waitlist.';
      validatePatient(patient, invalidUserErrorMessage);
      // If meals for tomorrow are available, patient cannot join the waitlist.
      const resultMeals = await getMealsForTomorrow();
      if (!resultMeals) {
        throw new Error('Error while fetching meal details.');
      }
      if (resultMeals.length > 0) {
        throw new Error(
          'Cannot join the waitlist as meals for tomorrow are available.'
        );
      }

      // Check if patient has already joined the waitlist for today.
      // set the date to midnight, as we are checking if the patient joined the waitlist between midnight and now.
      const currentIndianDate = DateTime.fromObject({
        zone: 'Asia/Kolkata',
      }).startOf('day');
      const waitListJoinTime = DateTime.now().setZone('Asia/Kolkata');
      const patientResult = await knex
        .select('id')
        .from('waitlist')
        .whereBetween('waitlist_join_time', [
          currentIndianDate,
          waitListJoinTime,
        ])
        .andWhere('patient_id', patient.id);
      if (patientResult && patientResult.length > 0) {
        throw new Error('Already joined waitlist for today.');
      }
      // Insert patient on to the waitlist.
      const mealsRequested = reqBody.meals_requested;
      if (!mealsRequested || mealsRequested === 0) {
        throw new Error('No. of meals requested not specified.');
      }
      const waitlistPatient = {
        id: uuidv4(),
        patient_id: patient.id,
        meals_requested: mealsRequested,
        waitlist_join_time: waitListJoinTime,
      };
      await knex('waitlist').insert(waitlistPatient);
      res
        .status(httpConstants.HTTP_STATUS_OK)
        .json({ message: 'Successfully joined waitlist!' });
    } catch (error) {
      res
        .status(httpConstants.HTTP_STATUS_BAD_REQUEST)
        .json({ message: error.message });
    }
  },
};

function validatePatient(patient, message) {
  if (!patient) {
    throw new Error('Patient details not provided.');
  } else if (patient.user_type != 'Patient') {
    throw new Error(message);
  }
}

async function markMealsAsCancelled(meals, res, patient, cookId) {
  // Cancel every meal together in one batch.
  await knex.transaction(async (tr) => {
    for (const meal of meals) {
      await tr('meal')
        .update('cancelled', true)
        .where('id', meal.id);
    }
  });

  // Whatsapp the admin telling them how many meals have been cancelled, along with details of the cook and patient.

  // Get the cook details.
  const cook = await knex
    .select(
      'user.first_name',
      'user.last_name',
      'user.phone_number',
      'address.locality_id',
      'address.first_line',
      'address.second_line',
      'address.building_name',
      'address.house_number',
      'address.zipcode',
      'address.state',
      'address.city',
      'locality.name'
    )
    .from('user')
    .join('address', 'user.id', '=', 'address.user_id')
    .join('locality', 'address.locality_id', '=', 'locality.id')
    .where('user.id', cookId)
    .first();

  // Whatsapp the admin
  var accountSid = process.env.TWILIO_ACCOUNT_SID;
  var authToken = process.env.TWILIO_AUTH_TOKEN;

  var twilio = require('twilio');
  var client = new twilio(accountSid, authToken);
  const patientStr =
    patient.first_name +
    ' ' +
    patient.last_name +
    '\nPhone number: ' +
    patient.phone_number +
    '\n\n';
  const cookStr =
    'Name: ' +
    cook.first_name +
    ' ' +
    cook.last_name +
    '\nPhone number: ' +
    cook.phone_number +
    '\nAddress: ' +
    cook.house_number +
    ', ' +
    cook.building_name +
    ',\n' +
    cook.first_line +
    ',\n' +
    cook.second_line +
    '\n' +
    cook.city +
    ' - ' +
    cook.zipcode +
    '\n' +
    cook.state;

  client.messages.create({
    from: 'whatsapp:' + process.env.WHATSAPP_BUSINESS_ACCOUNT_NUMBER,
    body:
      'Hi! The following meal recipient has cancelled *' +
      meals.length +
      '* meals: \n\n' +
      patientStr +
      'The cook details are: \n\n' +
      cookStr +
      '\n\nPlease check the waitlist to re-route cancelled meals.\n\nRegards,\nRecipe of Hope Website',
    to: 'whatsapp:+91' + process.env.WHATSAPP_ADMIN_NUMBER,
  });

  res.status(200).json({ message: 'Meals successfully cancelled.' });
}

async function mealBookingTimeCheck() {
  const date = DateTime.now().setZone('Asia/Kolkata');
  // if is is after 8 PM, patient cannot book a meal.
  if (date.hour >= 20) {
    throw new Error(
      'Cannot book meals after 8 PM. Please consider joining the waitlist.'
    );
  }
}
async function removePatientIdFromMeals(meals, res) {
  await knex.transaction(async (tr) => {
    for (const meal of meals) {
      await tr('meal')
        .update('patient_id', null)
        .where('id', meal.id);
    }
    res.status(200).json({ message: 'Meals successfully cancelled.' });
  });
}

async function getFormattedBookedMealsResponse(bookedMealsQueryResult) {
  return await Promise.all(
    bookedMealsQueryResult.map(async (bookedMeal) => {
      const formattedBookedMeals = {};
      const cookDetails = (formattedBookedMeals['cook_details'] = {});
      cookDetails['id'] = bookedMeal['cook_id'];

      // get the cook's name for the given meal.
      const cookDetailsQueryResult = await knex
        .select('first_name', 'last_name')
        .from('user')
        .where('id', cookDetails['id'])
        .first();

      cookDetails['name'] =
        cookDetailsQueryResult['first_name'] +
        ' ' +
        cookDetailsQueryResult['last_name'];

      // Get the cook's locality.
      const { name: localityName } = await knex
        .select('name')
        .from('locality')
        .where('id', function() {
          return this.select('locality_id')
            .from('address')
            .where('user_id', cookDetails['id'])
            .first();
        })
        .first();

      cookDetails['locality'] = localityName;

      formattedBookedMeals['date'] = DateTime.fromJSDate(
        bookedMeal['scheduled_for'],
        {
          zone: 'Asia/Kolkata',
        }
      )
        .setLocale('en-US')
        .toFormat('ccc, LLL dd');
      formattedBookedMeals['count'] = bookedMeal['count'];
      return [uuidv4(), formattedBookedMeals];
    })
  );
}
