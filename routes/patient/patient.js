const knex = require('../../data/db');
const { getCurrentIndianDate } = require('../common');

module.exports = {
  getMeals: async function(decodedUser, res) {
    try {
      if (!decodedUser) res.status(400).json({ message: 'Invalid user' });
      else if (decodedUser.user_type != 'Patient')
        res
          .status(400)
          .json({ message: 'User type is not allowed to book meal' });
      else {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getUTCDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        //Getting available meals scheduled for tomorrow.

        let getMealsQuery = knex
          .select('meal.cook_id')
          .count('meal.id')
          .from('meal')
          .where('meal.scheduled_for', '=', tomorrow)
          .whereNull('meal.patient_id')
          .groupBy('meal.cook_id');

        let resultMeals = await getMealsQuery;
        if (!resultMeals || resultMeals.length == 0) {
          throw new Error('Error while fetching meal details.');
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
        if (!resultCooks || resultCooks.length == 0) {
          throw new Error('Error while fetching available meals.');
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
          .where('address.user_id', '=', decodedUser.id);

        let userLocationDetails = await getUserLocalityQuery;

        if (!userLocationDetails || userLocationDetails.length == 0) {
          throw new Error('Error while fetching location details of patient.');
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
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  bookMeals: async function(decodedUser, requestBody, res) {
    try {
      if (!decodedUser) res.status(400).json({ message: 'Invalid user' });
      else if (decodedUser.user_type !== 'Patient')
        res
          .status(400)
          .json({ message: 'User type is not allowed to book meal' });
      else {
        if (!requestBody || requestBody.length === 0) {
          throw new Error('Missing request body with booking details.');
        }

        const tomorrow = new Date();
        mealBookingTimeCheck();
        tomorrow.setDate(tomorrow.getUTCDate() + 1);

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
                .update({ patient_id: decodedUser.id })
                .where('meal.id', '=', resultMeals[j].id);
            }

            success += result;
            totalMeals += requestBody[i].number_of_meals;
          }

          if (success == totalMeals)
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
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  cancelMeal: async function(patient, reqBody, res) {
    try {
      if (patient.user_type !== 'Patient') {
        throw new Error('Only patients cance meals via this route.');
      }
      const cookId = reqBody.cook_id;
      const mealScheduledFor = reqBody.scheduled_for;

      // Get all meals, which have the given patients id and the given cook's id.
      const todayMidnight = new Date();
      todayMidnight.setHours(0, 0, 0, 0);
      const meals = await knex
        .select('id', 'patient_id', 'scheduled_for', 'cancelled')
        .from('meal')
        .where({ cook_id: cookId, patient_id: patient.id })
        .andWhere('scheduled_for', mealScheduledFor);

      if (!meals || meals.length === 0) {
        throw new Error(
          'No errors to cancel for this cook for the given recipient.'
        );
      }

      const currentIndianDate = getCurrentIndianDate();
      const tomorrowMidnight = new Date();
      tomorrowMidnight.setDate(tomorrowMidnight.getUTCDate() + 1);
      tomorrowMidnight.setHours(0, 0, 0, 0);

      // // For each meal
      // for (const meal of meals) {
      //   // if the meal being cancelled is scheduled for today OR (for tomorrow, but current india time is after 8 PM), mark the meal as cancelled. Also, whatsapp the admin with the details of the patient, cook and no. of meals cancelled.
      //   if (meal.scheduled_for.getTime() === todayMidnight.getTime()) {
      //     if (currentIndianDate.getHours() <= 12) {
      //       markMealAsCancelled();
      //     } else {
      //       throw new Error('Meals scheduled for today cannot be cancelled after 12 PM.');
      //     }
      //   } else if (meal.scheduled_for.getTime() === tomorrowMidnight.getTime()) {
      //     if (currentIndianDate.getHours() >= 20) {
      //       markMealAsCancelled();
      //     } else {
      //     // If the meal being cancelled is for tomorrow and current India time is < 8 PM, remove the patient ID from the meal, thus releasing it back to the list of meals returns by the book meals API.
      //     }
      //   }
      // }

      // If the meal being cancelled is for tomorrow and current India time is < 8 PM, remove the patient ID from the meal, thus releasing it back to the list of meals returns by the book meals API.
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

function mealBookingTimeCheck() {
  const date = getCurrentIndianDate();
  // if is is after 8 PM, patient cannot book a meal.
  if (date.getHours() >= 20) {
    throw new Error(
      'Cannot book meals after 8 PM. Please consider joining the waitlist.'
    );
  }
}
