import prisma from '../../../lib/prisma';

async function handler(req, res) {
  if (req.method === 'PUT') {
    const { title, ingredients, directions, notes, user_id, recipeId } =
      req.body;

    const date = new Date();

    const recipe = await prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        course: 'dinner',
        title: title,
        ingredients,
        directions,
        notes,
        // user_id,
      },
    });
    console.log('UPDATED: ', recipe);

    res.status(200).json({ message: 'messaggge', id: recipe.id });
  }
}

export default handler;
