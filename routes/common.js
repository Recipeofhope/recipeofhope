const { DateTime } = require('luxon');
const knex = require('../data/db');
module.exports = {
  getMealsForTomorrow: function() {
    const tomorrow = DateTime.fromObject({
      hour: 0,
      zone: 'Asia/Kolkata',
    }).plus({ days: 1 });

    //Getting available meals scheduled for tomorrow.
    let getMealsQuery = knex
      .select('meal.cook_id')
      .count('meal.id')
      .from('meal')
      .where('meal.scheduled_for', '=', tomorrow)
      .whereNull('meal.patient_id')
      .groupBy('meal.cook_id');
    return getMealsQuery;
  },
};
