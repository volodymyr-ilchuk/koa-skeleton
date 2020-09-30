const { verifyToken } = require('../services/jwt');
const HttpError = require('../errors/http-error');

module.exports = async (ctx, next) => {
  if (!ctx.header['x-api-token']) {
    throw new HttpError('Unauthorized', 401);
  }

  const splitedToken = ctx.header['x-api-token'].split(' ');
  const decoded = await verifyToken(splitedToken[1]);
  ctx.state.userId = decoded.data.id;

  await next();
};
