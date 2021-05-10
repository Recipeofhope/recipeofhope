const knex = require('../../data/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

module.exports = {
  deleteUser: async function(userId, accessToken, res) {
    try {
      const decodedUser = await getDecodedUser(accessToken);
      if (!decodedUser.user_type) {
        throw new Error('Invalid payload from access token.');
      }
      if (decodedUser.user_type !== 'Admin') {
        throw new Error('Only Admins can delete other users.');
      }
      if (!userId) {
        throw new Error('User ID not provided.');
      }
      await knex('user')
        .where('id', userId)
        .del();
      res.status(200).json({ id: userId });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
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
      const match = await authenticateUser(
        user.password,
        dbUser.password.toString()
      );
      if (match) {
        const accessToken = jwt.sign(dbUser, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '15m',
        });
        const refreshToken = jwt.sign(
          dbUser,
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: '7 days',
          }
        );
        res.json({ access_token: accessToken, refresh_token: refreshToken });
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
          throw new Error('Invalid user type.');
        }
      } else {
        throw new Error('Missing user type.');
      }

      user.id = uuidv4();
      if (!user.address) {
        throw new Error('Missing user address details.');
      }
      user.address.id = uuidv4();
      user.address.user_id = user.id;
      if (!user.address.locality) {
        throw new Error('Missing user address locality.');
      }
      const localityId = await knex('locality')
        .where({ name: user.address.locality })
        .first('id');
      if (!localityId || localityId.id) {
        throw new Error('Invalid address locality.');
      }
      user.address.locality_id = localityId.id;
      const address = user.address;
      delete address.locality;
      delete user.address;
      // salt and hash password.
      if (user.password.length > 64) {
        throw new Error('Password field must be less than 64 characters.');
      }
      user.password = await bcrypt.hash(user.password, 12);

      const [id] = await knex.transaction((trx) => {
        return trx('user')
          .insert(user)
          .then(() => {
            return trx('address')
              .insert(address)
              .returning('user_id');
          });
      });

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
  updateUser: async (id, user, res) => {
    try {
      if (!user) {
        throw new Error('Missing user request body.');
      }

      const existingUser = await knex('user')
        .where({ id: id });

      if((existingUser || []).length == 0) {
        res.status(400).json({ message: "Invalid user" });
      } else {
        if (!user.address) {
          throw new Error('Missing user address details.');
        }

        if (!user.address.locality) {
          throw new Error('Missing user address locality.');
        }

        const localityId = await knex('locality')
          .where({ name: user.address.locality })
          .first('id');
        
        if (!localityId || localityId.id) {
          throw new Error('Invalid address locality.');
        }

        user.address.locality_id = localityId.id;
        const address = user.address;
        delete address.locality;
        delete user.address;

        const [ userId ] = await knex.transaction((trx) => {
          return trx('user')
            .update(user)
            .where({ id })
            .then(() => {
              return trx('address')
                .update(address)
                .returning('user_id');
            });
        });
        res.status(204).json({ id: userId, message: "updated user" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } 
};

async function getDecodedUser(accessToken) {
  if (!accessToken) {
    throw new Error('Access token not provided.');
  }
  const decodedUser = await jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  );
  return decodedUser;
}

async function authenticateUser(userPassword, dbUserPassword) {
  const match = await bcrypt.compare(userPassword, dbUserPassword);
  return match;
}
