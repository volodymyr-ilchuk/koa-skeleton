const HttpError = require('../../errors/http-error');
const { createToken } = require('../jwt-service');
const { comparePasswords } = require('../bcrypt-service');
const User = require('../../models/User');
const UserRefreshToken = require('../../models/UserRefreshToken');
const { generateRefreshToken } = require('../../shared/helpers');
// const { getUserByEmail } = require('../../repositories/auth-repository');

const login = async (email, password) => {
  const user = await User.query().where({
    email
  }).first();

  //  const user = await getUserByEmail(email);

  if (!user) {
    throw new HttpError('Invalid login', 401);
  }

  if (!await comparePasswords(password, user.password)) {
    throw new HttpError('Invalid login', 401);
  }

  const refreshToken = await generateRefreshToken();
  await UserRefreshToken.query().insert({
    user_id: user.id,
    token: refreshToken,
    expired_date: new Date() // TODO
  });
  const token = await createToken(user);
  return {
    token,
    refreshToken
  };
};

module.exports = {
  login
};
