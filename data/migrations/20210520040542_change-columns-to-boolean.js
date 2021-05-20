exports.up = function(knex) {
  return knex.schema.alterTable('meal', function(table) {
    table
      .boolean('cancelled')
      .defaultTo(false)
      .alter();
    table
      .boolean('ready')
      .defaultTo(false)
      .alter();
  });
};

exports.down = function(knex) {};
