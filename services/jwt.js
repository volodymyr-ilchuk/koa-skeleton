const jwt = require('jsonwebtoken');

const HttpError = require('../errors/http-error');

async function createToken(user) {
  const newToken = await new Promise((resolve, reject) => {
    jwt.sign({
      data: user,
      exp: Math.floor(Date.now() / 1000) + (process.env.TOKEN_TIME * 60 * 60)
    }, process.env.JWT_SECRET_KEY, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });

  return newToken;
}

async function verifyToken(token) {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        // eslint-disable-next-line
        console.error('error: ', err);
        rej(new HttpError('Invalid token', 401));
      } else {
        res(decoded);
      }
    });
  });
}

module.exports = {
  createToken,
  verifyToken
};
