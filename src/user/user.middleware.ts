import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

export const validateUserData = (
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
