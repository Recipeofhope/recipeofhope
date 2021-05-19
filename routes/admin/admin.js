const knex = require('../../data/db');

module.exports = {
  unapprovedCookList: async function(user, requestBody, res) {
    try {
      if (!decodedUser) res.status(400).json({ message: 'Invalid user' });
      else if (decodedUser.user_type != 'Admin')
        res.status(400).json({
          message: 'User type is not allowed to access this information.',
        });
      else {
        let unapprovedCooksQuery = knex
          .select('user.id')
          .from('user')
          .where('user.user_type', '=', 'Cook')
          .andWhere('user.approved', '=', 'False');

        let resultCooks = await unapprovedCooksQuery;

        if (!resultCooks || resultCooks.length == 0)
          throw new Error(
            'Error while fetching service areas of patient location.'
          );

        res.status(200).json(resultCooks);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
