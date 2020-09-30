const moment = require('moment');
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const {
  combine, timestamp, label, printf, colorize
} = format;

const consoleTransport = new transports.Console();

const ct = ts => moment(ts).format('YYYY-MM-DD HH:mm');

const jsonFormat = printf(info => JSON.stringify({
  datetime: ct(info.timestamp),
  level: info.level,
  label: info.label,
  payload: info.message
}));

const loggerFormat = printf(info => `${ct(info.timestamp)} ${info.level} [${info.label}]: ${info.message}`);

const dbloggerFormat = printf(info => `${ct(info.timestamp)} ${info.level} ${info.message}`);

module.exports.logger = module => {
  const path = module.filename.replace(process.cwd(), '').substr(1);
  return createLogger({
    level: 'verbose',
    format: combine(colorize(), label({ label: path }), timestamp(), loggerFormat),
    transports: [consoleTransport]
  });
};

module.exports.dblogger = () => createLogger({
  level: 'verbose',
  format: combine(colorize(), label(), timestamp(), dbloggerFormat),
  transports: [consoleTransport]
});

module.exports.createFileLogger = (loggerApplication = 'regular') => createLogger({
  level: 'debug',
  format: combine(label({ label: loggerApplication }), timestamp(), jsonFormat),
  defaultMeta: { service: loggerApplication },
  transports: [
    new DailyRotateFile({
      filename: `./logs/${loggerApplication}-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxSize: '100m',
      maxFiles: '14d'
    }),
    consoleTransport
  ]
});
