exports.up = function(knex) {
  return knex.schema.table('meal', function(table) {
    table.dropColumn('address_id');
  });
};

exports.down = function(knex) {
  return knex.schema.table('meal', function(table) {
    table.uuid('address_id');
  });
};
