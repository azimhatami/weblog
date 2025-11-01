import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

import { users, type User, type NewUser } from '../models/user.model';
import { db } from '../configs/db.config';
import { generateToken } from '../utils/jwt';

interface RegisterResponse {
  user: User;
  token: string;
};

interface LoginResponse {
  user: User;
  token: string;
};

interface LoginData {
  email: string;
  password: string;
}

export const registerUserService = async (userData: NewUser): Promise<RegisterResponse> => {
  const { fullname, email, password } = userData;

  const existUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existUser.length > 0) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [user] = await db
    .insert(users)
    .values({
      fullname,
      email,
      password: hashedPassword
    })
    .returning({
      id: users.id,
      fullname: users.fullname,
      email: users.email,
      createdAt: users.createdAt
    });

    const token = generateToken({
      userId: user.id,
      email: user.email
    });

    return {
      user,
      token
    };
};

export const loginUserService = async (userData: LoginData): Promise<LoginResponse> => {
  const { email, password } = userData;

  const [user] = await db
    .select({
      id: users.id,
      fullname: users.fullname,
      email: users.email,
      password: users.password,
      createdAt: users.createdAt
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({
    userId: user.id,
    email: user.email
  });

  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token
  };
};
