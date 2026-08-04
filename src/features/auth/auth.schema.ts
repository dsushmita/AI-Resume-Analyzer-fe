import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Required'),
  companyName: z.string().min(1, 'Required'),
  email: z.email('Enter a valid email'),
  password: z.string().min(8, 'At least 8 characters'),
});
export type RegisterValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(8, 'At least 8 characters'),
});
export type LoginValues = z.infer<typeof loginSchema>;
