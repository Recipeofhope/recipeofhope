const knex = require('../../data/db');
const { DateTime } = require('luxon');

module.exports = {
  unapprovedCookList: async function(admin, res) {
    try {
      userValidation(admin, res);
      let unapprovedCooksQuery = knex
        .select(
          'user.id',
          'user.first_name',
          'user.last_name',
          'user.username',
          'user.phone_number'
        )
        .from('user')
        .where('user.user_type', 'Cook')
        .andWhere('user.approved', false);

      let resultCooks = await unapprovedCooksQuery;

      if (!resultCooks)
        throw new Error('Error while fetching unapproved cooks.');

      res.status(200).json(resultCooks);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  approveCooks: async function(admin, reqBody, res) {
    try {
      userValidation(admin, res);

      const cooksList = reqBody;
      await knex.transaction(async (tr) => {
        for (const cook of cooksList) {
          await tr('user')
            .update('approved', true)
            .where('id', cook.id);
        }
      });
      res.sendStatus(200);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getWaitlist: async function(admin, res) {
    try {
      userValidation(admin, res);

      let waitlistQuery = knex('waitlist')
        .select(
          'user.id',
          'user.first_name',
          'user.last_name',
          'user.username',
          'user.phone_number',
          'address.first_line',
          'address.second_line',
          'address.building_name',
          'address.house_number',
          'address.zipcode',
          'address.state',
          'address.city',
          'locality.name',
          'waitlist.meals_requested',
          'waitlist.waitlist_join_time'
        )
        .from('waitlist')
        .leftJoin('user', 'user.id', 'waitlist.patient_id')
        .leftJoin('address', 'address.user_id', 'waitlist.patient_id')
        .leftJoin('locality', 'address.locality_id', 'locality.id');

      const currentIndianDate = DateTime.now().setZone('Asia/Kolkata'); //;
      // if it is after 8 PM, we get every patient who joined the waitlist from midnight today till now.
      let fromDate = DateTime.fromObject({ hour: 0, zone: 'Asia/Kolkata' });
      if (currentIndianDate.hour < 20) {
        // if is before 8 PM, we get every patient who joined the waitlist from the previous day's midnight, till now.
        fromDate = fromDate.minus({ days: 1 });
      }
      waitlistQuery = waitlistQuery
        .whereBetween('waitlist_join_time', [fromDate, currentIndianDate])
        .orderBy('waitlist_join_time');

      const recipients = await waitlistQuery;
      if (!recipients) {
        throw new Error('Error while fetching waitlist.');
      }
      res.status(200).json({ recipients });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

function userValidation(user, res) {
  if (!user) {
    res.status(400).json({ message: 'Missing admin details.' });
  } else if (user.user_type != 'Admin') {
    res.status(400).json({
      message: 'User type is not allowed to access this information.',
    });
  }
}
