import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async (req, res) => {
  const session = await getSession({ req });

  if (session && session.user.userId === req.body.userId) {
    console.log(req.body);

    const deleteRecipe = await prisma.recipe.delete({
      where: {
        id: req.body.recipeId,
      },
    });

    res.status(200).json({ message: 'DELETED IT' });
  }
};
