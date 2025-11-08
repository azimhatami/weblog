import { rateLimit } from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Rate limit exceeded',
    message: 'Too many requests. Please slow down'
  },
});
