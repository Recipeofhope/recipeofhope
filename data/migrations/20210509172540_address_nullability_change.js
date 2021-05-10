exports.up = function(knex) {
  return knex.schema.alterTable('address', (table) => {
    table
      .string('house_number')
      .nullable()
      .alter();
    table
      .string('building_name')
      .nullable()
      .alter();
  });
};

exports.down = function(knex) {};
