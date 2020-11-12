import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { getUserByName } from '../user/user.service';

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
