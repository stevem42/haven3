import getAllRecipes from '../../lib/dbUtil';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  try {
    // const recipes = await getAllRecipes();
    const recipes = await prisma.recipe.findMany();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch recipes' });
  }
}
