const HttpError = require('../../errors/http-error');
const { createToken } = require('../jwt-service');
const { comparePasswords } = require('../bcrypt-service');
const User = require('../../models/User');

const login = async (email, password) => {
  const user = await User.query().where({
    email
  }).first();

  if (!user) {
    throw new HttpError('Invalid login', 401);
  }

  if (!await comparePasswords(password, user.password)) {
    throw new HttpError('Invalid login', 401);
  }

  const token = await createToken(user);
  return token;
};

module.exports = {
  login
};
