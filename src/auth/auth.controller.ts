import { Request, Response, NextFunction } from 'express';
import { signToken } from './auth.service';

export const login = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const { id, name } = req.body;

  const payload = { id, name };
  try {
    const token = signToken({ payload });
    res.send({ id, name, token });
  } catch (error) {
    next(error);
  }
};
