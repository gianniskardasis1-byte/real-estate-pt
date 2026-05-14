import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prisma.configs.js';
import { mockProperties } from '../mockData.js';

// Create a new residency listing
export const createResidency = asyncHandler(async (req, res) => {
  const {
    title, description, price, address, city, country, region,
    image, images, facilities, userEmail, listingType, propertyType,
    area, bedrooms, bathrooms, yearBuilt,
  } = req.body.data;

  try {
    const residency = await prisma.residency.create({
      data: {
        title, description, price, address, city,
        country: country || 'Greece',
        region, image, images: images || [],
        facilities, listingType: listingType || 'sale',
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
export const getAllResidencies = (req, res) => {
  res.json(mockProperties);
};

// Get a single residency
export const getResidency = (req, res) => {
  const { id } = req.params;
  const mockProperty = mockProperties.find(p => p.id === id);
  res.json(mockProperty || null);
};
