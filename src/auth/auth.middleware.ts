import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { getUserByName } from '../user/user.service';
import { request } from 'http';
import jwt from 'jsonwebtoken';
import { PUBLIC_KEY } from '../app/app.config';
import { TokenPayload } from './auth.interface';

export const validateLoginData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, password } = req.body;
  if (!name) {
    return next(new Error('NAME_IS_REQUIRED'));
  }

  if (!password) {
    return next(new Error('PASSWORD_IS_REQUIRED'));
  }

  const user = await getUserByName(name, { needPassword: true });

  if (!user) {
    return next(new Error('USER_DOES_NOT_EXISTS'));
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    return next(new Error('PASSWORD_NOT_CORRECT'));
  }

  next();
};

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error();
    }
    const token = authorization.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });

    req.user = decoded as TokenPayload;

    next();
  } catch (error) {
    next(new Error('UNAUTHORIZED'));
  }
};
