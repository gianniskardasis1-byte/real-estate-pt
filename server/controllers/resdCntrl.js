import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prisma.configs.js';

// Create a new residency listing
export const createResidency = asyncHandler(async (req, res) => {
  const {
    title, description, price, address, city, country, region,
    image, images, facilities, userEmail, listingType, propertyType,
    area, bedrooms, bathrooms, yearBuilt,
  } = req.body.data;

  if (!userEmail) {
    res.status(400).send({ message: 'User email is required' });
    return;
  }

  try {
    const residency = await prisma.residency.create({
      data: {
        title, description, price, address, city,
        country: country || 'Greece',
        region, image: image || null, images: images || [],
        facilities: facilities || {}, listingType: listingType || 'sale',
        propertyType: propertyType || 'apartment',
        area, bedrooms, bathrooms, yearBuilt,
        owner: { connect: { email: userEmail } },
      },
    });
    res.send({ message: 'Residency created successfully', residency });
  } catch (err) {
    if (err.code === 'P2002') {
      throw new Error('A residency with this address already exists');
    }
    throw new Error(err.message);
  }
});

// Get all residencies - Returns mock data for development
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(residencies);
});

// Get a single residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const residency = await prisma.residency.findUnique({ where: { id } });
  if (!residency) {
    res.status(404).json(null);
    return;
  }
  res.json(residency);
});
