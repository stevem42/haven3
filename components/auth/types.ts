import { z } from 'zod';

export const FormSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export type FormSchema = z.infer<typeof FormSchema>;
