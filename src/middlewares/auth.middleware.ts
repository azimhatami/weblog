import type { Request, Response, NextFunction } from 'express';

import { verifyToken } from '../utils/jwt';
import { db } from '../configs/db.config';

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
    roleId?: number;
    role?: RoleName;
  }
}

type RoleName = 'admin' | 'author' | 'user';

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Access token required'
    });
  }

  try {
    const decoded = verifyToken(token) as AuthRequest['user'];
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: 'Invalid or expired token'
    });
  }
};

export const authorize = (role: RoleName | RoleName[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' })
      }

      if (!req.user.roleId) {
        return res.status(403).json({ message: 'User role not found' });
      }

      const userRole = await db.query.roles.findFirst({
        where: (roles, { eq }) => eq(roles.id, req.user!.roleId)
      })

      if (!userRole) {
        return res.status(403).json({ message: 'Access denied. Role not found' })
      }

      const rolesArray = Array.isArray(role) ? role : [role];

      if (!rolesArray.includes(userRole.name as RoleName)) {
        return res.status(403).json({ 
          message: `Access denied. Role ${userRole.name} does not have permission` 
        });
      }

      // Add role to req for use in controller
      req.user.role = userRole.name;

      next();
    } catch (error) {
      next(error);
    }
  }
}
