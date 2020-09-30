// потрібно запускать з кореня проекта
require('dotenv').config();

const knex = require('../database-connection');
const {
  updateProductInAlgoliaQueue
} = require('./queue');

updateProductInAlgoliaQueue.process(async job => {

});
