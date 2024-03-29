import winston from 'winston';
import { server } from '@/config';

const options = {
  console: {
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    prettyPrint: true,
    colorize: process.stdout.isTTY,
    silent: server.env === 'test',
  },
};

const logger = winston.createLogger({
  transports: [new winston.transports.Console(options.console)],
  exitOnError: false,
});

export default {
  log: (message: string): winston.Logger => logger.info(message),
  info: (message: string, obj?: unknown): winston.Logger => logger.info(message, obj),
  error: (message: string, obj?: unknown): winston.Logger => logger.error(message, obj),
  warn: (message: string, obj?: unknown): winston.Logger => logger.warn(message, obj),
  debug: (message: string, obj?: unknown): winston.Logger => logger.debug(message, obj),
  silly: (message: string, obj?: unknown): winston.Logger => logger.silly(message, obj),
};
