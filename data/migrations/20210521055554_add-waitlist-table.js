exports.up = function(knex) {
  return knex.schema.hasTable('waitlist').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('waitlist', function(table) {
        table
          .uuid('id')
          .primary()
          .notNullable();
        table
          .uuid('patient_id')
          .notNullable()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE');
        table.integer('meals_requested').notNullable();
        table.datetime('waitlist_join_time').notNullable();
      });
    }
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('waitlist');
};
