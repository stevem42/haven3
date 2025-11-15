import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method !== 'DELETE') {
    res.status(405).json({ message: 'Incorrect method' });
  }

  if (
    (session && session.user.id === req.body.userId) ||
    (session && session.user.id === '1')
  ) {
    console.log(req.body);

    const deleteRecipe = await prisma.recipe.delete({
      where: {
        id: req.body.recipeId,
      },
    });

    res.status(200).json({ message: 'DELETED IT' });
  } else {
    res.status(403).json({ message: 'Unathorised to perform this action' });
  }
}
