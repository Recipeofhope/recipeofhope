const knex = require('../../data/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

module.exports = {
  loginUser: async function(user, res) {
    try {
      if (!user) {
        throw new Error('Please enter user details.');
      }
      if (!user.username) {
        throw new Error('Please enter username.');
      }
      const dbUser = await knex('user')
        .where({ username: user.username })
        .first();
      if (!dbUser) {
        throw new Error(
          'User with username ' + "'" + user.username + "' not found."
        );
      }
      const match = await bcrypt.compare(
        user.password,
        dbUser.password.toString()
      );
      if (match) {
        const accessToken = jwt.sign(dbUser, process.env.TOKEN_SECRET, {
          expiresIn: '15m',
        });
        const refreshToken = jwt.sign(dbUser, process.env.TOKEN_SECRET, {
          expiresIn: '7 days',
        });
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      } else {
        res.status(400).json({ message: 'Invalid Credentials' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  createUser: async function(user, res) {
    try {
      if (!user) {
        throw new Error('Missing user request body.');
      }
      if (user.user_type) {
        if (user.user_type === 'Cook') {
          user.approved = false;
        } else if (user.user_type === 'Patient') {
          user.approved = true;
        } else if (user.user_type === 'Admin') {
          throw new Error('Admin creation not allowed via API.');
        } else {
          throw new Error('Invalid User type.');
        }
      } else {
        throw new Error('Missing User type.');
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
        res.status(400).json({ message: error.message });
      }
    }
  },
};
