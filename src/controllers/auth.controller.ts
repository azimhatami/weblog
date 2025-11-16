import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

import { 
  registerUserService, 
  loginUserService 
} from '../services/auth.service';
import { 
  validateCreateUser, 
  validateLoginUser, 
} from '../validation/user.validator';
import type {
  CreateUserDTO,
  LoginUserDTO
} from '../validation/user.validator';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validateResult = validateCreateUser(req.body);

    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validateResult.error.issues.map(issue => issue.message)
      });
    }

    const createUserDTO: CreateUserDTO = validateResult.data;
    const result = await registerUserService(createUserDTO);

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
    // const { email, password }  = req.body;
    const validateResult = validateLoginUser(req.body);

    if (!validateResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validateResult.error.issues.map(issue => issue.message)
      });
    }

    const loginUserDTO: LoginUserDTO = validateResult.data;
    const result = await loginUserService(loginUserDTO);

    res.status(200).json({
      message: 'Login successful',
      user: result.user,
      token: result.token
    });
  } catch (error) {
    next(error);
  }
};
