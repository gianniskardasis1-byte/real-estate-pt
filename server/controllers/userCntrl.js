import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prisma.configs.js';

export const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email } });

  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });

    return res.status(201).json({
      message: 'User register successfully',
      user,
    });
  }

  return res.status(200).json({ message: 'User already registered' });
});
