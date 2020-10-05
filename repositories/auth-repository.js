const User = require('../models/User');

const getUserByEmail = email => User.query().where({
  email
}).first();

module.exports = {
  getUserByEmail
};
