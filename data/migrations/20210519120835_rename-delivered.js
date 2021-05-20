exports.up = function(knex) {
  return knex.schema
    .alterTable('meal', function(table) {
      table
        .string('delivered')
        .defaultTo(false)
        .alter();
    })
    .then(() => {
      return knex.schema.table('meal', function(table) {
        table.renameColumn('delivered', 'cancelled');
      });
    });
};

exports.down = function(knex) {
  table.renameColumn('cancelled', 'delivered').alter();
};
