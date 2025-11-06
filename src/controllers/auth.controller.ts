import { type Request, type Response, type NextFunction } from 'express';
import bcrypt from 'bcryptjs';

import { registerUserService, loginUserService } from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullname, email, password } = req.body;

    const result = await registerUserService({
      fullname,
      email,
      password
    });

    res.status(201).json({
      message: 'User created successfully',
      user: result.user,
      token: result.token
    });
    
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }  = req.body;

    const result = await loginUserService({ email, password });

    res.status(200).json({
      message: 'Login successful',
      user: result.user,
      token: result.token
    });
  } catch (error) {
    next(error);
  }
};
