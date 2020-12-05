import { Request, Response, NextFunction } from 'express';

export const requestUrl = (req: Request, res: Response, next: NextFunction) => {
  console.log('Request URL: ', req.url);
  console.log('Request Body: ', req.body);
  console.log('Request Headers: ', req.headers);
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
    case 'USER_NAME_EXISTS':
      statusCode = 409;
      message = '用户已经存在了';
      break;
    case 'USER_DOES_NOT_EXISTS':
      statusCode = 400;
      message = '当前登录用户不存在';
      break;
    case 'PASSWORD_NOT_CORRECT':
      statusCode = 400;
      message = '密码不对';
      break;
    case 'UNAUTHORIZED':
      statusCode = 401;
      message = '请先登录';
      break;
    case 'FILE_NOT_FOUND':
      statusCode = 404;
      message = '文件不存在';
      break;
    case 'TAG_ALREADY_EXIST':
      statusCode = 400;
      message = '标签已经存在';
      break;
    case 'POST_ALREADY_HAS_THE_TAG':
      statusCode = 400;
      message = '文章已经被打上此标签';
      break;
    case 'POST_HAS_NO_SUCH_TAG':
      statusCode = 400;
      message = '文章无此标签';
      break;
    default:
      statusCode = 500;
      message = 'Something wrong with the server... ';
      break;
  }
  res.status(statusCode).send(message);
};
