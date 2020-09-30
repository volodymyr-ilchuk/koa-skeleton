const Knex = require('knex');
const { Model } = require('objection');

const knexfile = require('./knexfile.js');
const knexLogger = require('./services/loggers/knex-logger');

const knex = Knex(knexfile);

knex.on('query', knexLogger.query);
knex.on('query-response', knexLogger.query_response);

Model.knex(knex);

module.exports = knex;
