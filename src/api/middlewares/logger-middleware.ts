import { randomUUID } from 'node:crypto';
import { NextFunction, Request, Response } from 'express';
import logger from '@/infra/logger/pino';

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const requestId = randomUUID();

  logger.infoHTTP({
    requestId,
    msg: `${req.method} ${req.url} received.`,
    event: 'REQUEST_RECEIVED',
  });

  res.on('finish', () => {
    logger.infoHTTP({
      requestId,
      msg: `${req.method} ${req.url} finished with status ${res.statusCode}.`,
      status: res.statusCode,
      event: 'REQUEST_FINISHED',
    });
  });
  next();
}
