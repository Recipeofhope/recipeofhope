exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('user', function(table) {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table.string('first_name', 50).notNullable();
      table.string('last_name', 50).notNullable();
      table.string('username', 50).notNullable();
      table.string('password', 50).notNullable();
      table.string('phone_number', 10).notNullable();
      table
        .enu('user_type', ['Cook', 'Patient', 'Admin', 'Volunteer'])
        .notNullable()
        .defaultTo('Patient'); // TODO: See if this is needed. I've put this since user type is not nullable
    })
    .createTable('locality', function(table) {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table.string('name', 50).notNullable();
    })
    .createTable('address', function(table) {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table
        .uuid('locality_id')
        .notNullable()
        .references('id')
        .inTable('locality');
      table
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('user');
      table.string('first_line', 255).notNullable();
      table.string('second_line', 255).nullable();
      table.string('building_name', 50).notNullable();
      table.string('house_number', 10).notNullable();
      table.string('zipcode', 6).notNullable();
      table.string('state', 50).notNullable();
      table.string('city', 50).notNullable();
    })
    .createTable('meal', function(table) {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table
        .uuid('cook_id')
        .nullable()
        .references('id')
        .inTable('user');
      table
        .uuid('patient_id')
        .notNullable()
        .references('id')
        .inTable('user');
      table
        .uuid('address_id')
        .nullable()
        .references('id')
        .inTable('address');
      table.boolean('city').nullable();
      table.date('scheduled_for').notNullable();
      table.boolean('cancelled').nullable();
      table.boolean('delivered').nullable();
    })
    .createTable('service_areas', function(table) {
      table
        .uuid('locality_id')
        .notNullable()
        .references('id')
        .inTable('locality');
      table
        .uuid('service_area_id')
        .notNullable()
        .references('id')
        .inTable('locality');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('service_areas')
    .dropTable('meal')
    .dropTable('address')
    .dropTable('locality')
    .dropTable('user');
};
