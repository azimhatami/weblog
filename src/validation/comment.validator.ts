import * as z from 'zod';

const CreateCommentSchema = z.object({
  content: z.string()
    .trim()
    .min(1, 'Comment must be at least 1 character')
    .max(150, 'Comment must be at most 150 characters'),

  postId: z.number()
    .int()
    .min(1, 'Post ID is invalid')
}).strict();

const UpdateCommentSchema = z.object({
  content: z.string()
    .trim()
    .min(1, 'Comment must be at least 1 character')
    .max(150, 'Comment must be at most 150 characters')
}).strict();

export type CreateCommentDTO = z.infer<typeof CreateCommentDTO>;

export type UpdateCommentDTO = z.infer<typeof UpdateCommentDTO>;

export const validateCreateComment = (data: unknown) => {
  return CreateCommentSchema.safeParse(data);
};

export const validateUpdateComment = (data: unknown) => {
  return UpdateCommentSchema.safeParse(data);
};
