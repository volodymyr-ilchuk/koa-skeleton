const Router = require('koa-joi-router');
// const BookmarkRepository = require('../../../shared/repositories/BookmarkRepository');
// const BookmarkService = require('../../../shared/services/BookmarkService');
// const authenticated = require('../../../shared/middlewares/authenticated');
// const checkNormal = require('../../../shared/middlewares/checkNormal');
// const SingleValidationError = require('../../../shared/core/errors/SingleValidationError');
// const constants = require('../../../shared/constants');
// const { deleteQuestionBookmarkRecombee } = require('../../queue/queues');
const HttpError = require('../errors/http-error');
const { createToken } = require('../services/jwt');

const User = require('../models/User');

const router = Router();

/**
 * @swagger
 * paths:
 *  /api/login:
 *    post:
 *      tags:
 *        - Authorization
 *      summary: Login
 *      description: Login
 *      parameters:
 *        - in: body
 *          name: body
 *          schema:
 *            type: object
 *            required: [email, password]
 *            properties:
 *              email:
 *                type: string
 *                default: 'rex3@mail.com'
 *              password:
 *                type: string
 *                default: '123456'
 *      responses:
 *        200:
 *          $ref: "#/responses/200"
 *        400:
 *          $ref: "#/responses/400"
 *        401:
 *          $ref: "#/responses/401"
 */
router.route({
  method: 'POST',
  path: '/login',
  validate: {
    type: 'json',
    body: {
      email: Router.Joi.string().required().email(),
      password: Router.Joi.string().required().min(6).max(20) // TODO перевірка на спецсимволи regex
    }
  },
  // handler: async function handler(ctx) {}
  // handler: async ctx => {}
  async handler(ctx) {
    const { email, password } = ctx.request.body;
    const login = await User.query().where({
      email,
      password
    }).first();
    // TODO створити новий репозиторій для костяка проекту і залити його
    // нове завдання нова вітка
    // добавить бкріпт
    // логіка сервіс репозитирій
    // розібраться з гіт хабом по ссаш
    // добавить рефреш токен
    console.log(login);
    if (!login) {
      throw new HttpError('Invalid login', 401);
    }
    const token = await createToken(login);
    ctx.body = { token };
    ctx.status = 200;
  }

});

module.exports = router
  .prefix('/api')
  .middleware();
