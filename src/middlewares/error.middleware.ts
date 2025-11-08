import { type Request, type Response, type NextFunction } from 'express';


enum ApiErrorCode {
  USER_ALREADY_EXISTS = 'User already exists',
  INVALID_CREDENTIALS = 'Invalid credentials',
  POST_NOT_FOUND = 'Post not found',
  USER_NOT_AUTHENTICATED = 'User not authenticated',
  INTERNAL_SERVER_ERROR = 'Internal server error'
}

interface ApiErrorDef {
  status: number;
  message: string;
}

interface CustomError extends Error {
  statusCode?: number;
  errorCode?: ApiErrorCode
}

export const ApiErrors = {
  [ApiErrorCode.USER_ALREADY_EXISTS]: {
    status: 400,
    message: 'User already exists',
  },
  [ApiErrorCode.INVALID_CREDENTIALS]: {
    status: 400,
    message: 'Invalid credentials',
  },
  [ApiErrorCode.POST_NOT_FOUND]: {
    status: 404,
    message: 'Post not found',
  },
  [ApiErrorCode.USER_NOT_AUTHENTICATED]: {
    status: 401,
    message: 'User not authenticated',
  },
  [ApiErrorCode.INTERNAL_SERVER_ERROR]: {
    status: 500,
    message: 'Internal server error',
  },
} as const satisfies Record<ApiErrorCode, ApiErrorDef>;

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

  if (error.errorCode && ApiErrors[error.errorCode as ApiErrorCode]) {
    const errorConfig = ApiErrors[error.errorCode as ApiErrorCode];

    return res.status(errorConfig.status).json({
      message: errorConfig.message,
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        originalError: error.message
      })
    });
  }

  const errorMessage = error.message as ApiErrorCode;
  if (ApiErrors[errorMessage]) {
    const errorConfig = ApiErrors[errorMessage];
    return res.status(errorConfig.status).json({
      message: errorConfig.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }

  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: statusCode === 500 ? 'Internal server error': error.message,
    ...(process.env.NODE_ENV === 'development'  && { stack: error.stack })
  });

};
