import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { getUserByName } from './user.service';

export const validateUserData = async (
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

  const user = await getUserByName(name);

  if (user) {
    return next(new Error('USER_NAME_EXISTS'));
  }

  next();
};

export const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { password } = req.body;
  req.body.password = await bcrypt.hash(password, 10);

  next();
};
