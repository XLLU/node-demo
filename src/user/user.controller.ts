import { Request, Response, NextFunction } from 'express';
import * as userService from './user.service';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, password } = req.body;
    const data = userService.createUser({ name, password });
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};
