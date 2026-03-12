import express from 'express';
import {
  createUser, bookVisit, cancelBooking,
  addFavourite, getAllFavourites, getAllBookings,
} from '../controllers/userCntrl.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/bookVisit/:id', bookVisit);
router.post('/cancelBooking/:id', cancelBooking);
router.post('/addFavourite/:rid', addFavourite);
router.post('/allFavourites', getAllFavourites);
router.post('/allBookings', getAllBookings);

export { router as userRoute };