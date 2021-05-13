const knex = require('../../data/db');
const { v4: uuidv4 } = require('uuid');


module.exports = {
  getMeals: async function (decodedUser, res) {
    try {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getUTCDate() + 1);

      //Getting available meals scheduled for tomorrow.

      let getMealsQuery = knex.
        select(
          'meal.cook_id')
        .count('meal.id')
        .from('meal')
        .where('meal.scheduled_for', "=", tomorrow)
        .whereNull('meal.patient_id')
        .groupBy('meal.cook_id');

      let resultMeals = await getMealsQuery;
      if (!resultMeals || typeof resultMeals === 'undefined' || resultMeals.length == 0) {
        throw new Error('Error while fetching meal details.');
      }


      //Getting cook details for available meals.

      //Get all cook details.
      let getCooksQuery = knex.
        select(
          'user.id',
          'user.first_name',
          'user.last_name',
          'address.locality_id',
          'locality.name')
        .from('user')
        .join('address', 'user.id', '=', 'address.user_id')
        .join('locality', 'address.locality_id', '=', 'locality.id')
        .where('user.user_type', '=', 'Cook');

      let resultCooks = await getCooksQuery;

      //Final list of available meals from cooks.
      if (!resultCooks || typeof resultCooks === 'undefined' || resultCooks.length == 0) {
        throw new Error('Error while fetching details.');
      }

      for (i = 0; i < resultMeals.length; i++) {
        for (j = 0; j < resultCooks.length; j++) {
          if (resultMeals[i].cook_id.toString() === resultCooks[j].id.toString()) {
            resultMeals[i].cook_name = resultCooks[j].first_name + resultCooks[j].last_name;
            resultMeals[i].locality_id = resultCooks[j].locality_id;
            resultMeals[i].locality_name = resultCooks[j].name;
          }
          else
            continue;
        }
      }


      // Sort list - near and far.

      //Get location details of patient.
      if (!decodedUser) {
        res.status(400).json({ message: 'Invalid user' });
      } else {
        let getUserLocalityQuery = knex.
          select(
            'address.locality_id')
          .from('address')
          .where('address.user_id', "=", decodedUser.id);

        let userLocationDetails = await getUserLocalityQuery;

        if (!userLocationDetails || typeof userLocationDetails === 'undefined' || userLocationDetails.length == 0) {
          throw new Error('Error while fetching details.');
        }

        // Get service areas of patient location.

        let getServiceAreas = knex.
          select('service_areas.service_area_id')
          .from('service_areas')
          .where('service_areas.locality_id', '=', userLocationDetails[0].locality_id);

        let serviceAreas = await getServiceAreas;

        if (!serviceAreas || typeof serviceAreas === 'undefined' || serviceAreas.length == 0) {
          throw new Error('Error while fetching details.');
        }

        // Compare cook locations with service areas of patient location. If match, nearby set to true.

        for (i = 0; i < resultMeals.length; i++) {
          for (j = 0; j < serviceAreas.length; j++) {
            if (resultMeals[i].locality_id.toString() === serviceAreas[j].service_area_id.toString())
            {
              resultMeals[i].nearby = 1;
              break;
            }
            else
              resultMeals[i].nearby = 0;
          }
        }
      }
      res.status(200).json(resultMeals);
    }

    catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}