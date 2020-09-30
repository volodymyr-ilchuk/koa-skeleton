const Queue = require('bull');

const connection = { redis: { port: 6380, host: '127.0.0.1' } };
const createProductInAlgoliaQueue = new Queue('createProductInAlgoliaQueue', 'redis://127.0.0.1:6380');
const updateProductInAlgoliaQueue = new Queue('updateProductInAlgoliaQueue', connection);

module.exports = {
  createProductInAlgoliaQueue,
  updateProductInAlgoliaQueue
};
