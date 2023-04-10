import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export type LoginFormSchema = z.infer<typeof LoginFormSchema>;

export const RegisterFormSchema = LoginFormSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

export type RegisterFormSchema = z.infer<typeof RegisterFormSchema>;

export const RecipeSchema = z.object({
  title: z.string(),
  course: z.string(),
  ingredients: z.string(),
  directions: z.string(),
  notes: z.string().optional(),
  user_id: z.string(),
});

export type RecipeSchema = z.infer<typeof RecipeSchema>;

export const CreatedRecipeSchema = RecipeSchema.extend({
  id: z.number(),
});

export type CreatedRecipeSchema = z.infer<typeof CreatedRecipeSchema>;
