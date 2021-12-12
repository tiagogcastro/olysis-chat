import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '@errors/AppError';
import { authConfig } from '@config/auth';

interface TokenPayload {
  exp: number;
  iat: number
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    }

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}