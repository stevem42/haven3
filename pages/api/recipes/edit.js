import prisma from '../../../lib/prisma';

async function handler(req, res) {
  if (req.method === 'PUT') {
    const { title, ingredients, directions, notes, course, recipeId } =
      req.body;

    const recipe = await prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        course,
        title: title,
        ingredients,
        directions,
        notes,
      },
    });
    console.log('UPDATED: ', recipe);

    res.status(200).json({ message: 'messaggge', id: recipe.id });
  }
}

export default handler;
