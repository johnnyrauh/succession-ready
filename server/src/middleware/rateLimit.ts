import rateLimit from 'express-rate-limit';

export const assessmentRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute per IP
  message: {
    error: 'Too many requests. Please wait a moment before trying again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
