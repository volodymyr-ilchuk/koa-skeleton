module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);

    switch (error.name) {
    // TODO
    case 'ValidationError':
      ctx.status = 400;
      ctx.body = {
        type: error.name,
        errors: error.errors.errors
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
