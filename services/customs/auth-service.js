const HttpError = require('../../errors/http-error');
const { createToken } = require('../jwt-service');
const { comparePasswords } = require('../bcrypt-service');
const User = require('../../models/User');
const UserRefreshToken = require('../../models/UserRefreshToken');
const { generateRefreshToken } = require('../../shared/helpers');
const { refreshTokenLifetime } = require('../../shared/constants');
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
  // $2a$08$aDXneFdVpC/Wk1GLh.dieOtZHhGR158C5SikBO8wZHc5BlXdImgiq
  const refreshToken = await generateRefreshToken();
  await UserRefreshToken.query().insert({
    user_id: user.id,
    token: refreshToken,
    expired_date: Math.floor(Date.now() / 1000) + refreshTokenLifetime
  });
  const token = await createToken(user);
  delete user.password;
  return {
    tokenInfo: {
      accessToken: `Bearer ${token.newToken}`, // обєднання рядків
      tokenType: 'bearer',
      refreshToken,
      expiredInAccessToken: token.expiredIn
    },
    user
  };
};

module.exports = {
  login
};
