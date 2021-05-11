const knex = require('../../data/db');
const bcrypt = require('bcrypt');

module.exports = {
  cancelMeal: async (id, res) => {
    try {
      // Check if meal id exists
      const meal = await knex('meal')
          .where({ id });
      
      if((meal || []).length == 0) {
        throw new Error("Meal not found!");
      } 

      // Check if current time and scheduled time difference is > 6hrs
      const scheduledTime = meal.scheduled_for;
      const currentTime = new Date();
      const difference = 6; 
      if(difference < 6) {
        throw new Error("Meal cannot be cancelled now!");
      }
      // set the field `cancelled` to false
      await knex.transaction((trx) => {
        return trx('meal')
          .update({ cancelled: true })
          .where({ id });
      });
  
    } catch(error) {
      console.log('error: ', error);
      res.status(400).json({ message: error.message });
    }
  }
}