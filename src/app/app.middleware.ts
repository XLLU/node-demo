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
    case 'NAME_IS_REQUIRED':
      statusCode = 400;
      message = '用户名必填哦';
      break;
    case 'PASSWORD_IS_REQUIRED':
      statusCode = 400;
      message = '密码必填哦';
      break;
    default:
      statusCode = 500;
      message = 'Something wrong with the server... ';
      break;
  }
  res.status(statusCode).send(message);
};
