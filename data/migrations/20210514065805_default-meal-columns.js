exports.up = function(knex) {
  return knex.schema.alterTable('meal', function(table) {
    table
      .string('ready')
      .defaultTo(false)
      .alter();
    table
      .string('delivered')
      .defaultTo(false)
      .alter();
  });
};

exports.down = function(knex) {};
