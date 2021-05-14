const knex = require('../../data/db');

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
      else if (decodedUser.user_type != 'Patient')
        res
          .status(400)
          .json({ message: 'User type is not allowed to book meal' });
      else {
        if (!requestBody || requestBody.length === 0) {
          throw new Error('Missing request body with booking details.');
        }

        console.log(decodedUser);
        console.log(requestBody);

        const tomorrow = new Date();
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
};
