const knex = require('../../data/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  login: async function(user, res) {},
  createUser: async function(user, res) {
    try {
      if (!user) {
        throw new Error('Missing user request body.');
      }
      user.id = uuidv4();
      // salt and hash password.
      if (user.password.length > 64) {
        throw new Error('Password field must be less than 64 characters.');
      }
      user.password = await bcrypt.hash(user.password, 12);

      const [id] = await knex('user')
        .returning('id')
        .insert(user);
      res.status(201).json({ id: id });
    } catch (error) {
      if (error.constraint && error.constraint === 'user_username_unique') {
        res.status(400).json({
          message:
            'Username ' +
            "'" +
            user.username +
            "' already exists. Please choose another username.",
        });
      } else {
        res.status(400).json({ message: error });
      }
    }
  },
};
