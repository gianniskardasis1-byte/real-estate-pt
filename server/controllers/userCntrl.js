import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prisma.configs.js'

// Register / login user
export const createUser = asyncHandler(async (req, res) => {
  let { email } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (!userExists) {
    const user = await prisma.user.create({ data: req.body });
    res.send({ message: 'User registered successfully', user });
  } else {
    res.status(201).send({ message: 'User already registered' });
  }
});

// Book a visit
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  const user = await prisma.user.findUnique({ where: { email }, select: { bookedVisits: true } });
  const alreadyBooked = user.bookedVisits.some((visit) => visit.id === id);
  if (alreadyBooked) {
    res.status(400).json({ message: 'This residency is already booked by you' });
    return;
  }

  await prisma.user.update({
    where: { email },
    data: { bookedVisits: { push: { id, date } } },
  });
  res.send({ message: 'Visit booked successfully' });
});

// Cancel a booked visit
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  const user = await prisma.user.findUnique({ where: { email }, select: { bookedVisits: true } });
  const updatedVisits = user.bookedVisits.filter((visit) => visit.id !== id);

  await prisma.user.update({
    where: { email },
    data: { bookedVisits: updatedVisits },
  });
  res.send({ message: 'Booking cancelled successfully' });
});

// Add to favourites
export const addFavourite = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  const user = await prisma.user.findUnique({ where: { email }, select: { favResidenciesID: true } });

  if (user.favResidenciesID.includes(rid)) {
    // Remove from favourites
    const updated = await prisma.user.update({
      where: { email },
      data: { favResidenciesID: { set: user.favResidenciesID.filter((id) => id !== rid) } },
    });
    res.send({ message: 'Removed from favourites', user: updated });
  } else {
    // Add to favourites
    const updated = await prisma.user.update({
      where: { email },
      data: { favResidenciesID: { push: rid } },
    });
    res.send({ message: 'Added to favourites', user: updated });
  }
});

// Get all favourites
export const getAllFavourites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email }, select: { favResidenciesID: true } });
  res.send(user.favResidenciesID);
});

// Get all bookings
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email }, select: { bookedVisits: true } });
  res.send(user.bookedVisits);
});