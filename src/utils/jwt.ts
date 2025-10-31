import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export type JwtPayload = {
  userId: number;
  email: string;
};

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
