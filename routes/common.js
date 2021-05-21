const knex = require('../data/db');
module.exports = {
  getCurrentIndianDate: function() {
    const d = new Date();
    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;

    // create new Date object for different city
    // using supplied offset
    const nd = new Date(utc + 3600000 * '+5.5');
    return nd;
  },

  getMealsForTomorrow: function() {
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
    return getMealsQuery;
  },
};
