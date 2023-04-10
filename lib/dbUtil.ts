import { prisma } from './prisma';

export async function getAllRecipes() {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        date_posted: 'desc',
      },
    });

    return recipes;
  } catch (error) {
    console.log(error);
  }
}

export async function getRecipeById(id: number) {
  if (typeof id !== 'number') {
    return null;
  }
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: id,
      },
    });
    return recipe;
  } catch (error) {}
}

export async function getSomeRecipes() {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        date_posted: 'desc',
      },
      take: 10,
    });
    return recipes;
  } catch (error) {
    console.log(error);
  }
}
