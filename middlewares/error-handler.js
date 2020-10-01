module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);

    switch (error.name) {
    case 'ValidationError':
      ctx.status = 400;
      ctx.body = {
        type: error.name,
        errors: error.details.map(obj => ({
          message: obj.message,
          context: obj.context
        }))
      };
      return; // якщо після switch потрібно щось виконувати то замисть return пишем break
    case 'HttpError':
      ctx.status = error.statusCode;
      ctx.body = { type: error.name, error: error.errorMessage };
      return;
    default: break;
    }

    ctx.status = 500;
    ctx.body = {
      type: 'GeneralError',
      error: 'Something went wrong'
    };
  }
};
