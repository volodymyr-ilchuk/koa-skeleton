const now = require('performance-now');
const _ = require('lodash');
const moment = require('moment');
const logger = require('./logger').dblogger();

const times = {};

const printQueryWithTime = uid => {
  const { startTime, endTime, query } = times[uid];
  const elapsedTime = endTime - startTime;
  let qString = query.sql;
  if (query.bindings.length) {
    query.bindings.forEach(element => {
      let e;
      switch (true) {
      case _.isString(element):
        e = `'${element}'`;
        break;
      case _.isDate(element):
        e = `'${moment(element).toISOString()}'`;
        break;
      default:
        e = element;
        break;
      }
      qString = qString.replace('?', e);
    });
  }
  const executionTime = +elapsedTime.toFixed(0);

  logger.log({
    level: executionTime >= 100 ? 'warn' : 'info',
    message: `${Math.ceil(elapsedTime)}ms > ${qString}`
  });
  delete times[uid];
};

module.exports = {
  query: query => {
    const uid = query.__knexQueryUid;
    times[uid] = {
      query, 
      startTime: now()
    };
  },
  query_response: (response, query) => {
    const uid = query.__knexQueryUid;
    times[uid].endTime = now();
    printQueryWithTime(uid);
  }
};
