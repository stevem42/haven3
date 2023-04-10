import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (req.method !== 'PUT') {
    res.status(405).json({ message: 'Incorrect method' });
  }

  const parsedData = JSON.parse(req.body.data);
  const userId = parsedData.user_id;
  const recipeId = req.body.recipeId;

  if (
    (session && session.user.id === userId) ||
    (session && session.user.id === '1')
  ) {
    const { title, ingredients, directions, notes, course } = parsedData;

    const recipe = await prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        course,
        title,
        ingredients,
        directions,
        notes,
      },
    });
    res.status(200).json({ message: 'messaggge', id: recipe.id });
  } else {
    res.status(403).json({ message: 'Unathorised to perform this action' });
  }
}

export default handler;
