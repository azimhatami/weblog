import * as z from 'zod';

export const CreatePostSchema = z.object({
  title: z.string()
    .trim()
    .min(5, 'Title must be at least 5 characters')
    .max(150, 'Title must be at most 150 characters'),

  content: z.string()
    .trim()
    .min(10, 'Content must be at least 10 characters')
}).strict('Unknown fields are not allowed');

export type CreatePostDTO = z.infer<typeof CreatePostSchema>;

export const validateCreatePost = (data: unknown) => {
  return CreatePostSchema.safeParse(data);
};
