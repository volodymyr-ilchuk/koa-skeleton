const Router = require('koa-joi-router');

const { login } = require('../services/customs/auth-service');

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
      password: Router.Joi.string().required().min(6).max(20)
        .regex(/^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%])[a-zA-Z0-9@#$%]+$/)
        .error(errors => {
          errors.forEach(err => {
            switch (err.type) {
            case 'string.regex.base':
              err.message = 'Your password must include: 1 upper case letter, one lower case letter,'
              + ' one number, one spec symbol @#$%';
              break;
            default:
              break;
            }
          });
          return errors;
        })
    }
  },
  // TODO створити новий репозиторій для костяка проекту і залити його
  // нове завдання нова вітка
  // розібраться з гіт хабом по ссаш

  // handler: async function handler(ctx) {}
  // handler: async ctx => {}
  async handler(ctx) {
    const { email, password } = ctx.request.body;

    const result = await login(email, password);

    ctx.body = result;
    ctx.status = 200;
  }

});

module.exports = router
  .prefix('/api')
  .middleware();
