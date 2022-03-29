async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body);

    res.status(201).json({ message: 'messaggge' });
  }
}

export default handler;
