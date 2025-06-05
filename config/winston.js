const winston = require('winston');
const appRoot = require('app-root-path');

const options = {
  File: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleException: true,
    format: winston.format.json(),
    maxsize: 5000000, // 5 MB
    maxFile: 5,
  },
  Console: {
    level: 'debug',
    handleException: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }
}

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.File),
    new winston.transports.Console(options.Console)
  ],
  exitOnError: false
});

logger.stream = {
  write: function(message) {
    logger.info(message);
  }
};

module.exports = logger;
