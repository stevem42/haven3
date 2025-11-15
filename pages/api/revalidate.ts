import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid Token on regenerate' });
  }
  const id = req.body;

  try {
    await res.revalidate(`/recipes/${id}`);
    console.log(res);
    return res.json({ revalidated: true });
  } catch (error) {
    return res.status(500).send('Error Revalidating');
  }
}
