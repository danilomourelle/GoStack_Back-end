import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import BaseError from '../errors/BaseError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const token = req.headers.authorization;

  if (!token) {
    throw new BaseError('JWT token is missing', 401);
  }

  try {
    const data = verify(token, authConfig.jwt.secret) as TokenPayload;

    const { sub } = data;

    res.locals.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new BaseError('Invalid JWT token', 401);
  }
}
