import { createLogger, format, transports } from 'winston';

// Define a compatible type inline for the stream
export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/server.log' }),
  ],
});

// Add the stream without explicitly using StreamOptions
logger.stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
} as any;
