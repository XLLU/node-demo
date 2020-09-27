import { Request, Response, NextFunction } from "express";

export const printRequestUrl = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(request.url);
  next();
};

export const defaultErrorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let statusCode: number, message: string;

  switch (message) {
    default:
      statusCode = 500;
      message = "Internal Server Error. Contact the Dev. ";
      break;
  }

  response.status(statusCode).send(message);
};
