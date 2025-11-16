import * as z from 'zod';

export const CreateUserSchema = z.object({
  fullname: z.string()
    .trim()
    .min(4, 'Fullname must be at least 4 characters')
    .max(50, 'Fullname must be at most 50 characters'),

  email: z.string()
    .trim()
    .email('Email is invalid')
    .transform(email => email.toLowerCase()),

  password: z.string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .max(28, 'Password must be at most 28 characters')
}).strict('Unknown fields are not allowed');

export const LoginUserSchema = z.object({
  email: z.string()
    .trim()
    .email('Email is invalid')
    .transform(email => email.toLowerCase()),
  
  password: z.string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .max(28, 'Password must be at most 28 characters'),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
export type LoginUserDTO = z.infer<typeof LoginUserSchema>;

export const validateCreateUser = (data: unknown) => {
  return CreateUserSchema.safeParse(data)
};

export const validateLoginUser = (data: unknown) => {
  return LoginUserSchema.safeParse(data)
};
