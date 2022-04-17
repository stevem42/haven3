export default async function handler(req, res) {
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid Token on regenerate' });
  }

  const id = req.body;

  try {
    await res.unstable_revalidate(`/recipes/${id}`);
    return res.json({ revalidated: true });
  } catch (error) {
    return res.status(500).send('Error Revalidating');
  }
}
