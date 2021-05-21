const knex = require('../../data/db');

module.exports = {
  unapprovedCookList: async function(user, res) {
    try {
      if (!user) res.status(400).json({ message: 'Invalid user' });
      else if (user.user_type != 'Admin')
        res.status(400).json({
          message: 'User type is not allowed to access this information.',
        });
      else {
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
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
