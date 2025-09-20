import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Ошибка сервера' });
};

export default errorHandler;
