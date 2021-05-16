const faker = require('faker');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([{
        id: faker.datatype.uuid(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        username: faker.internet.userName(),
        approved: faker.datatype.boolean(),
        password: faker.internet.password(),
        phone_number: faker.random.arrayElement(['7045533410', '8289933192', '9382200192']),
        user_type: faker.random.arrayElement(['Cook', 'Patient'])
      }]);
    });
};
