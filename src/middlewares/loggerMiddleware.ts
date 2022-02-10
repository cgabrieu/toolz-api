import winston from 'winston';

const options = {
  console: {
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    prettyPrint: true,
    colorize: process.stdout.isTTY,
  },
};

const logger = winston.createLogger({
  transports: [new winston.transports.Console(options.console)],
  exitOnError: false,
});

export default {
  log: (message: string): winston.Logger => logger.info(message),
  info: (message: string, obj?: any): winston.Logger =>
    logger.info(message, obj),
  error: (message: string, obj?: any): winston.Logger =>
    logger.error(message, obj),
  warn: (message: string, obj?: any): winston.Logger =>
    logger.warn(message, obj),
  debug: (message: string, obj?: any): winston.Logger =>
    logger.debug(message, obj),
  silly: (message: string, obj?: any): winston.Logger =>
    logger.silly(message, obj),
};
