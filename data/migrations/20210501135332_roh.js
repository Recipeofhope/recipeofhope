exports.up = function(knex, Promise) {
  return knex.schema
    .createTableIfNotExists('user', function(table) {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table.string('first_name', 50).notNullable();
      table.string('last_name', 50).notNullable();
      table
        .string('username', 50)
        .unique()
        .notNullable();
      table.boolean('approved').notNullable();
      table.binary('password', 60).notNullable();
      table.string('phone_number', 10).notNullable();
      table
        .enu('user_type', ['Cook', 'Patient', 'Admin'])
        .notNullable()
        .defaultTo('Patient');
    })
    .createTableIfNotExists('locality', function(table) {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table.string('name', 50).notNullable();
    })
    .createTableIfNotExists('address', function(table) {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table
        .uuid('locality_id')
        .notNullable()
        .references('id')
        .inTable('locality')
        .onDelete('CASCADE');
      table
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table.string('first_line', 255).notNullable();
      table.string('second_line', 255).nullable();
      table.string('building_name', 50).notNullable();
      table.string('house_number', 10).notNullable();
      table.string('zipcode', 6).notNullable();
      table.string('state', 50).notNullable();
      table.string('city', 50).notNullable();
    })
    .createTableIfNotExists('meal', function(table) {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table
        .uuid('cook_id')
        .nullable()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table
        .uuid('patient_id')
        .notNullable()
        .references('id')
        .inTable('user')
        .onDelete('CASCADE');
      table
        .uuid('address_id')
        .nullable()
        .references('id')
        .inTable('address')
        .onDelete('CASCADE');
      table.boolean('ready').nullable();
      table.date('scheduled_for').notNullable();
      table.boolean('cancelled').nullable();
      table.boolean('delivered').nullable();
    })
    .createTableIfNotExists('service_areas', function(table) {
      table
        .uuid('id')
        .primary()
        .notNullable();
      table
        .uuid('locality_id')
        .notNullable()
        .references('id')
        .inTable('locality')
        .onDelete('CASCADE');
      table
        .uuid('service_area_id')
        .notNullable()
        .references('id')
        .inTable('locality')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('service_areas')
    .dropTableIfExists('meal')
    .dropTableIfExists('address')
    .dropTableIfExists('locality')
    .dropTableIfExists('user');
};
