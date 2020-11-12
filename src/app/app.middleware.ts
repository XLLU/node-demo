import { Request, Response, NextFunction } from 'express';

export const requestUrl = (req: Request, res: Response, next: NextFunction) => {
  console.log('Request URL: ', req.url);
  console.log('Request Body: ', req.body);
  next();
};

export const defaultErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error.message) {
    console.log('Error:', error.message);
  }

  let statusCode: number, message: string;

  switch (error.message) {
    default:
      statusCode = 500;
      message = 'Something wrong with the server... ';
      break;
  }
  res.status(statusCode).send(message);
};
