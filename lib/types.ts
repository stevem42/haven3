import { z } from 'zod';

export const Recipe = z.object({
  id: z.number(),
  course: z.string(),
  title: z.string(),
  date_posted: z.date(),
  ingredients: z.string(),
  directions: z.string(),
  notes: z.string().optional(),
  recipe_image: z.string().optional(),
  user_id: z.number(),
});

export type Recipe = z.infer<typeof Recipe>;

export const isRecipe = (data: unknown): data is Recipe => {
  return Recipe.safeParse(data).success;
};

export const RecipeArray = z.array(Recipe);

export type RecipeArray = z.infer<typeof RecipeArray>;

export const isRecipeArray = (data: unknown): data is RecipeArray => {
  return RecipeArray.safeParse(data).success;
};
