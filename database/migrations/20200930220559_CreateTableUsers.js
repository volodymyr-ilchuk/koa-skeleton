exports.up = async knex => {
  await knex.schema.createTable('users', t => {
    t.increments();
    t.string('email', 100).notNullable().unique();
    t.string('password', 100).notNullable();
  });
  await knex.schema.createTable('users_refresh_tokens', t => {
    t.integer('user_id').notNullable();
    t.string('token', 100).notNullable().unique();
    t.bigInteger('expired_date').notNullable();
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('users_refresh_tokens');
};
