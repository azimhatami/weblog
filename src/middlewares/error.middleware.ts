import { type Request, type Response, type NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error: ', err);

  if (!(err instanceof Error)) {
    return res.status(500).json({
      message: 'Internal server error',
      details: 'Unknown error type'
    });
  }

  const error = err as CustomError;

  switch (error.message) {
    case 'User already exists':
      return res.status(400).json({
        message: error.message
      });

    case 'Invalid credentials':
      return res.status(400).json({
        message: error.message
      });

    case 'Post not found':
      return res.status(404).json({
        message: error.message
      });

    case 'User not authenticated':
      return res.status(401).json({
        message: error.message
      });

    default: 
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({
        message: statusCode === 500 ? 'Internal server error' : error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      });
  }
};

