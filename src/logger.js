import pino from 'pino';

// Logs estruturados (JSON), um objeto por linha.
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  enabled: process.env.NODE_ENV !== 'test',
});
