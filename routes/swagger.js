const swagger = require('swagger-jsdoc');
const Router = require('koa-joi-router');

const router = Router();

const swaggerSpec = swagger({
  swaggerDefinition: {
    info: {
      title: 'CVLT API',
      version: '1.0'
    },
    // basePath: '/api', для того щоб шлях всіх роутів починався з '/api'
    securityDefinitions: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        description: 'Primary authorization token for app',
        name: 'x-api-token'
      }
    },
    parameters: {
      // pageParam: {
      //   in: 'query',
      //   name: 'page',
      //   type: 'integer',
      //   required: false,
      //   minimum: 1,
      //   default: 1,
      //   description: 'Page number'
      // },
      // pEntityType: {
      //   in: 'path',
      //   name: 'entityType',
      //   type: 'string',
      //   required: true,
      //   enum: ['userAvatar', 'productPhoto'],
      //   default: 'productPhoto',
      //   description: 'file type'
      // },
      // formDataFile: {
      //   in: 'formData',
      //   name: 'photo',
      //   type: 'file',
      //   description: 'The file to upload',
      //   required: true
      // }
    },
    responses: {
      200: {
        description: 'Ok'
      },
      201: {
        description: 'Created'
      },
      202: {
        description: 'Accepted'
      },
      204: {
        description: 'No content'
      },
      400: {
        description: 'Validation errors'
      },
      401: {
        description: 'Unauthorized'
      },
      403: {
        description: 'Forbidden'
      },
      404: {
        description: 'Not found'
      },
      409: {
        description: 'Conflict'
      }
    }
  },
  apis: [
    './routes/**/*.js',
    './models/**/*.js'
  ]
});

router.route({
  method: 'GET',
  path: '/swagger/spec.json',

  async handler(ctx) {
    ctx.body = swaggerSpec;
  }

});

module.exports = router
  .prefix('/api')
  .middleware();
