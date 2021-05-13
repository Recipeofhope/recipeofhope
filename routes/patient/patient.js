const knex = require('../../data/db');
const _isEmpty = require('lodash/isEmpty');
/* 
  user: user object
  requestBody: { cookId, noOfMeals }
*/
module.exports = {
  cancelMeals: async function(id, requestBody, user, res) {
    try {
      if(!user) {
        throw new Error('Unable to extract user information.');
      }
      if (user.user_type !== 'Patient') {
        throw new Error('Only patients can cancel meals.');
      }
      // Check if request body contains cookId and noOfMeals.
      if (_isEmpty(requestBody)) {
        throw new Error('Request body is empty');
      }
      if (_isEmpty(requestBody.cookId) || _isEmpty(requestBody.noOfMeals)) {
        throw new Error('Bad request, cookId or noOfMeals is missing.');
      }
      // TotalMeals: [meal m] Find the total number of meals(rows) with patientId === m.patientId && cookId === m.cookId.
      const patientId = user.id;
      const { cookId, noOfMeals } = requestBody;
      const totalMealsAvailedFromThisCook = await knex('meals')
        .where({ patientId: patientId, cookId: cookId })
        .select('id');
      // TotalMeals >= noOfMeals => Go ahead and set patientId in each of the rows to null.
      if (noOfMeals > totalMealsAvailedFromThisCook) {
        throw new Error(`You can't cancel more than what you ordered.`);
      } else {
        for (let i = 0; i < noOfMeals; i++) {
          const mealId = totalMealsAvailedFromThisCook[i];
          const [updatedMealId] = await knex.transaction((trx) => {
            return trx('meals')
              .update(null)
              .where({ mealId })
              .returning('id');
          });
          console.log(
            `MealId ${updatedMealId} is now available to be ordered.`
          );
        }
      }
      // Else notify user that he can't cancel more than what he has ordered.
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
