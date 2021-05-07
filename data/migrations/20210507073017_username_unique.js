exports.up = function(knex) {
  return knex.schema.alterTable('user', function(t) {
    t.unique('username');
  });
};

exports.down = function(knex) {};
