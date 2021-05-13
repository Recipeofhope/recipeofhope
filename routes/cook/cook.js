const knex = require('../../data/db');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  scheduleMeals: async function(user, requestBody, res) {
    try {
      if (user.user_type !== 'Cook') {
        throw new Error('Only cooks can schedule meals.');
      }

      if (!requestBody || requestBody.length === 0) {
        throw new Error('Missing request body with dates of scheduled meals.');
      }
      const startDate = new Date(requestBody[0].date);
      const endDate = new Date(requestBody[requestBody.length - 1].date);
      if (startDate > endDate) {
        throw new Error(
          ' Dates of the scheduled meals are not given in ascending order.'
        );
      }
      // Check if startDate occurs only 2 days after the current date.
      const twoDaysFromToday = new Date();
      twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 1);
      if (startDate < twoDaysFromToday) {
        throw new Error(
          'Cooks cannot cancel meals for today or tomorrow. Check the provided start date for the scheduled meals.'
        );
      }

      // Delete meals provided within the given date range.
      await knex.transaction(async (tr) => {
        let result = await tr('meal')
          .whereBetween('scheduled_for', [startDate, endDate])
          .andWhere('cook_id', user.id)
          .del();
        // Insert meals provided within the given date range
        // Loop over the provided array of scheduled meals.
        console.log(JSON.stringify(result));
        for (const scheduledMeal of requestBody) {
          // For each array item, prepare a meal row you can insert into the DB.
          const meal = {};
          meal.cook_id = user.id;
          meal.scheduled_for = new Date(scheduledMeal.date);
          // Insert the row into the meal table 'x' no. of times, where x is the no, of meals scheduled by the cook for that date.
          for (let i = 0; i < scheduledMeal.number_of_meals; i++) {
            meal.id = uuidv4();
            result = await tr('meal').insert(meal);
          }
        }
      });
      res.sendStatus(204);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
