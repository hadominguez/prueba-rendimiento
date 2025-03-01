const winston = require("winston");
const { DailyRotateFile } = require("winston-daily-rotate-file");
const ConfigEnv = require("../config/config");

const logDirectory = 'logs';

const rotateOptions = {
  filename: `${logDirectory}/app_%DATE%.log`,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d"
};

const formato = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.printf((info) => {
    if (info.hasOwnProperty("stack")) {
      return `${info.timestamp} [${info.level.toUpperCase().padEnd(7)}]: ${
        info.message
      }
      ${info.stack}`;
    } else {
      return `${info.timestamp} [${info.level.toUpperCase().padEnd(7)}]: ${
        info.message
      }`;
    }
  })
);

const logger = winston.createLogger({
  format: formato,
  transports: [ 
    new winston.transports.Console({level: ConfigEnv.LEVEL_LOG_CONSOLE}),
    new winston.transports.DailyRotateFile(rotateOptions)
  ],
});

module.exports = logger;
