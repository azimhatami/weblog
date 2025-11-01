import { type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';

import { registerUserService, loginUserService } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
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
    if (error instanceof Error) {
      if (error.message === 'User already exists') {
        return res.status(400).json({
          message: error.message
        });
      }
    }

    res.status(500).json({
      message: 'Server error'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }  = req.body;

    const result = await loginUserService({ email, password });

    res.status(200).json({
      message: 'Login successful',
      user: result.user,
      token: result.token
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Invalid credentials') {
        return res.status(400).json({
          message: error.message
        });
      }
    }

    res.status(500).json({
      message: 'Server error'
    });
  }
};
