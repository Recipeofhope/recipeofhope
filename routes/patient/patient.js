const knex = require('../../data/db');
const { v4: uuidv4 } = require('uuid');


module.exports = {
  getMeals: async function(decodedUser, res) {
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

      //Getting details to send to UI.

      const detailsObj={};

      let getDetailsQuery = knex.
      select(
          'user.id',
          'user.first_name',
          'user.last_name',
          'address.locality_id',
          'locality.name')
          .from('user')
          .join('address', 'user.id', '=', 'address.user_id')
          .join('locality', 'address.locality_id', '=', 'locality.id');
      
            i=0;
            id = resultMeals[i].cook_id;
            console.log(id);
            
            let resultDetails = await getDetailsQuery
            .where('user.id', "=", id);

            if (!resultDetails || typeof resultDetails === 'undefined' || resultDetails.length == 0) {
                throw new Error('Error while fetching details.');
              } 

              if (detailsObj[i] === undefined){
                  detailsObj[i] = {};
              }
              detailsObj[i].cook_id = resultMeals[i].cook_id;
              detailsObj[i].cook_name = resultDetails[i].first_name + resultDetails[0].last_name;
              detailsObj[i].locality_id = resultDetails[i].locality_id;
              detailsObj[i].locality_name = resultDetails[i].name;
              detailsObj[i].available_meals = resultMeals[i].count;
            

        
        

         res.status(200).json(resultMeals); 
      }

      catch (error) {
        res.status(400).json({ message: error.message });
      }
  }
}