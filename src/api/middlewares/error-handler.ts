import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '@/application/errors';
import { isProdEnv } from '@/helpers/env';

export function errorHandler(
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!error)
    next();

  if (error instanceof ValidationError) {
    res.status(400).json({
      type: error.name,
      message: error.message,
      errors: error.fields,
      stack: isProdEnv ? undefined : error.stack,
    });
  }

  if (error instanceof Error) {
    res.status(500).json({
      type: error.name,
      message: error.message,
      stack: isProdEnv ? undefined : error.stack,
    });
  }

  res.status(503).json({
    type: 'Unavailable Service',
    message: error,
  });
}
