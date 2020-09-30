const Router = require('koa-joi-router');
// const BookmarkRepository = require('../../../shared/repositories/BookmarkRepository');
// const BookmarkService = require('../../../shared/services/BookmarkService');
// const authenticated = require('../../../shared/middlewares/authenticated');
// const checkNormal = require('../../../shared/middlewares/checkNormal');
// const SingleValidationError = require('../../../shared/core/errors/SingleValidationError');
// const constants = require('../../../shared/constants');
// const { deleteQuestionBookmarkRecombee } = require('../../queue/queues');

const User = require('../models/User');

const router = Router();

/**
 * @swagger
 * paths:
 *  /bookmarks:
 *    delete:
 *      tags:
 *        - Bookmarks
 *      summary: Delete bookmarks
 *      description: Delete bookmarks
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: body
 *          name: body
 *          schema:
 *            type: object
 *            required: [bookmarksIds]
 *            properties:
 *              bookmarksIds:
 *                type: array
 *                items:
 *                   type: integer
 *                   default: 1
 *      responses:
 *        200:
 *          $ref: "#/responses/200"
 *        400:
 *          $ref: "#/responses/200"
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
    console.log(login);

    ctx.body = {};
    ctx.status = 200;
  }
});

module.exports = router
  .prefix('/api')
  .middleware();
