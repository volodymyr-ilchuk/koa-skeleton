exports.up = async knex => {
  await knex.schema.createTable('users', t => {
    t.increments();
    t.string('email', 100).notNullable().unique();
    t.string('password', 100).notNullable();
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('users');
};
