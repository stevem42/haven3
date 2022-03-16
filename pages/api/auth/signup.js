import { hashPassword } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const { email, password } = data;

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message: 'Invalid Input - Password Should be at least 7 characters',
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      res.status(422).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const result = await prisma.user.create({
      data: {
        username: email,
        email: email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: 'Created new user' });
  }
}

export default handler;
