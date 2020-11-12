import { Request, Response, NextFunction } from 'express';

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { name, passowrd } = req.body;

  res.status(200).send({ message: `Welcome back, ${name}` });
};
