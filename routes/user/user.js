const knex = require('../../data/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { DateTime } = require('luxon');
const refreshTokens = {};

module.exports = {
  getUser: async function(user, res) {
    try {
      const returnObj = await getUserDetails(user);
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
        refreshTokens[refreshToken] = user.username;
        const returnObj = await getUserDetails(dbUser);
        res.json({
          auth: true,
          access_token: accessToken,
          refresh_token: refreshToken,
          user: returnObj.user,
          address: returnObj.address,
          meals: returnObj.meals,
        });
      } else {
        res.status(400).json({ auth: false, message: 'Invalid Credentials' });
      }
    } catch (error) {
      res.status(400).json({ auth: false, message: error.message });
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
      const locality = address.locality;
      delete address.locality;
      delete user.address;
      // salt and hash password.
      if (user.password.length > 64) {
        throw new Error('Password field must be less than 64 characters.');
      }
      user.password = await bcrypt.hash(user.password, 12);

      await knex.transaction((trx) => {
        return trx('user')
          .insert(user)
          .then(() => {
            return trx('address')
              .insert(address)
              .returning('user_id');
          });
      });
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
      });
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7 days',
      });

      refreshTokens[refreshToken] = user.username;
      delete user.id;
      delete user.approved;
      delete user.password;
      delete address.id;
      delete address.locality_id;
      delete address.user_id;
      address.locality = locality;

      res.status(201).json({ user, address, accessToken, refreshToken });
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
  updateUser: async (id, user, decodedUser, res) => {
    try {
      if (!user) {
        throw new Error('Missing user request body.');
      }

      // invalid user!
      if (!decodedUser) {
        res.status(400).json({ message: 'Invalid user' });
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

        if (!localityId || !localityId.id) {
          throw new Error('Invalid address locality.');
        }

        user.address.locality_id = localityId.id;
        const address = user.address;
        delete address.locality;
        delete user.address;

        const [userId] = await knex.transaction((trx) => {
          return trx('user')
            .update(user)
            .where({ id })
            .then(() => {
              return trx('address')
                .update(address)
                .returning('user_id');
            });
        });
        res.status(200).json({ id: userId, message: 'updated user' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getAccessToken: async (refreshToken, res) => {
    try {
      if (!refreshToken) {
        throw new Error('Missing refresh token in request header.');
      }
      // check if refresh token is in cache.
      if (refreshTokens[refreshToken]) {
        // Check if token is not expired.
        try {
          const decodedUser = await jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
          );
          // exp field needs to be removed before making new access token for the same object.
          delete decodedUser.exp;
          const accessToken = jwt.sign(
            decodedUser,
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: '15m',
            }
          );
          res.json({
            auth: true,
            access_token: accessToken,
          });
        } catch (error) {
          if (error.name === 'TokenExpiredError') {
            // Refresh token has expired. Remove it from the cache.
            delete refreshTokens[refreshToken];
            throw new Error(
              'Refresh token has expired. Please login the user again.'
            );
          }
          throw error;
        }
      } else {
        throw new Error(
          'Refresh token is inactive. Please login the user again.'
        );
      }
    } catch (error) {
      res.status(400).json({ auth: false, message: error.message });
    }
  },
  logout: async (refreshToken, res) => {
    try {
      if (refreshToken) {
        delete refreshTokens[refreshToken];
      }
      res.status(200).json({
        result: true,
        error: '',
        message: 'User logged out successfully.',
      });
    } catch (error) {
      res.status(400).json({
        result: false,
        error: error.message,
        message: 'User log out failed.',
      });
    }
  },
  getLocalities: async (req, res) => {
    try {
      const localities = await knex.select('name').from('locality');
      if (!localities || localities.length === 0) {
        throw new Error('No localities found.');
      }
      res.status(200).json({ localities });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

async function getUserDetails(user) {
  if (user.user_type === 'Admin') {
    const admin = await knex
      .select(
        'user.id',
        'user.first_name',
        'user.last_name',
        'user.username',
        'user.approved',
        'user.user_type'
      )
      .from('user')
      .where('user.id', user.id)
      .first();
    if (!admin) {
      throw new Error('Error fetching admin details.');
    }
    return {
      user: admin,
    };
  }
  let getDetailsQuery = knex
    .select(
      'user.id',
      'user.first_name',
      'user.last_name',
      'user.username',
      'user.approved',
      'user.user_type',
      'user.phone_number',
      'meal.ready AS meal_ready',
      'meal.scheduled_for AS meal_scheduled_for',
      'meal.cancelled as meal_cancelled',
      'meal.patient_id as meal_patient_id',
      'address.first_line AS address_first_line',
      'address.second_line AS address_second_line',
      'address.building_name AS address_building_name',
      'address.house_number AS address_house_number',
      'address.zipcode AS address_zipcode',
      'address.state AS address_state',
      'address.city AS address_city',
      'locality.name AS address_locality'
    )
    .from('user');
  if (user.user_type === 'Cook') {
    getDetailsQuery = getDetailsQuery.leftJoin(
      'meal',
      'meal.cook_id',
      'user.id'
    );
  } else if (user.user_type === 'Patient') {
    getDetailsQuery = getDetailsQuery.leftJoin(
      'meal',
      'meal.patient_id',
      'user.id'
    );
  }
  const currentIndianDate = DateTime.now().setZone('Asia/Kolkata');
  let date = DateTime.fromObject({ zone: 'Asia/Kolkata' }).startOf('day');
  if (currentIndianDate.hour >= 20) {
    date = date.plus({ days: 1 });
  }
  let result = await getDetailsQuery
    .leftJoin('address', 'address.user_id', 'user.id')
    .leftJoin('locality', 'address.locality_id', 'locality.id')
    .where('user.id', '=', user.id);
  const returnObj = getReturnObj(result, date);
  return returnObj;
}

async function authenticateUser(userPassword, dbUserPassword) {
  const match = await bcrypt.compare(userPassword, dbUserPassword);
  return match;
}

function getReturnObj(result, date) {
  const returnObj = {};
  if (!result || typeof result === 'undefined' || result.length == 0) {
    throw new Error('Error while fetching user details.');
  }
  returnObj.user = {};
  returnObj.user.first_name = result[0].first_name;
  returnObj.user.last_name = result[0].last_name;
  returnObj.user.username = result[0].username;
  returnObj.user.approved = result[0].approved;
  returnObj.user.user_type = result[0].user_type;

  returnObj.address = {};
  returnObj.address.first_line = result[0].address_first_line;
  returnObj.address.second_line = result[0].address_second_line;
  returnObj.address.building_name = result[0].address_building_name;
  returnObj.address.house_number = result[0].address_house_number;
  returnObj.address.zipcode = result[0].address_zipcode;
  returnObj.address.state = result[0].address_state;
  returnObj.address.city = result[0].address_city;
  returnObj.address.locality = result[0].address_locality;
  returnObj.meals = {};
  for (const mealObj of result) {
    // For a cook, for today's/tomorrow's meals, we must only count the meals that have a patient ID assigned, as the meals with no patient IDs are meals that the cook has pledged, but they do not need to cook.
    if (
      returnObj.user.user_type === 'Cook' &&
      (!mealObj.meal_scheduled_for ||
        (!mealObj.meal_patient_id &&
          DateTime.fromISO(mealObj.meal_scheduled_for, {
            zone: 'Asia/Kolkata',
          }).toMillis() === date.toMillis()))
    ) {
      continue;
    }
    const meal = {};
    meal.meal_ready = mealObj.meal_ready;
    meal.meal_cancelled = mealObj.meal_cancelled;
    let meal_scheduled_for = null;
    if (mealObj.meal_scheduled_for) {
      meal_scheduled_for = mealObj.meal_scheduled_for.toLocaleDateString(
        'en-CA'
      );
    }
    if (!(meal_scheduled_for in returnObj.meals) && meal_scheduled_for) {
      returnObj.meals[meal_scheduled_for] = [];
    }

    if (meal_scheduled_for) {
      returnObj.meals[meal_scheduled_for].push({
        ready: meal.meal_ready,
        cancelled: meal.meal_cancelled,
      });
    }
  }
  return returnObj;
}
