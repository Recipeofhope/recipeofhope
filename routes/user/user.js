const knex = require('../../data/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

module.exports = {
  getUser: async function(accessToken, res) {
    try {
      const decodedUser = await getDecodedUser(accessToken);
      let getDetailsQuery = knex
        .select(
          'user.id',
          'user.first_name',
          'user.last_name',
          'user.username',
          'user.approved',
          'user.user_type',
          'meal.ready as meal_ready',
          'meal.scheduled_for as meal_scheduled_for',
          'meal.cancelled as meal_cancelled',
          'meal.delivered as meal_delivered',
          'address.first_line AS address_first_line',
          'address.second_line AS address_second_line',
          'address.building_name AS address_building_name',
          'address.house_number AS address_house_number',
          'address.zipcode AS address_zipcode',
          'address.state AS address_state',
          'address.city AS address_city'
        )
        .from('user');
      if (decodedUser.user_type === 'Cook') {
        getDetailsQuery = getDetailsQuery.leftJoin(
          'meal',
          'meal.cook_id',
          'user.id'
        );
      } else if (decodedUser.user_type === 'Patient') {
        getDetailsQuery = getDetailsQuery.leftJoin(
          'meal',
          'meal.patient_id',
          'user.id'
        );
      }
      let result = await getDetailsQuery
        .leftJoin('address', 'address.user_id', 'user.id')
        .where('user.id', '=', decodedUser.id);
      const returnObj = getReturnObj(result);
      res.status(200).json(returnObj);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  deleteUser: async function(userId, decodedUser, res) {
    try {
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
      if (!localityId || !localityId.id) {
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

function getReturnObj(result) {
  const returnObj = {};
  if (!result || typeof result === 'undefined' || result.length == 0) {
    throw new Error('Error while fetching user details.');
  }
  returnObj.first_name = result[0].first_name;
  returnObj.last_name = result[0].last_name;
  returnObj.username = result[0].username;
  returnObj.approved = result[0].approved;
  returnObj.user_type = result[0].user_type;
  returnObj.address_first_line = result[0].address_first_line;
  returnObj.address_second_line = result[0].address_second_line;
  returnObj.address_building_name = result[0].address_building_name;
  returnObj.address_house_number = result[0].address_house_number;
  returnObj.address_zipcode = result[0].address_zipcode;
  returnObj.address_state = result[0].address_state;
  returnObj.address_city = result[0].address_city;
  returnObj.meals = [];
  for (const mealObj of result) {
    let meal = {};
    meal.meal_ready = mealObj.meal_ready;
    meal.meal_scheduled_for = mealObj.meal_scheduled_for;
    meal.meal_cancelled = mealObj.meal_cancelled;
    meal.meal_delivered = mealObj.meal_delivered;
    returnObj.meals.push(meal);
  }
  return returnObj;
}
