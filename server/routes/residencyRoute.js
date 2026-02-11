import express from 'express';
import { createUser } from '../controllers/resdCntrl';
const router = express.Router()

router.post("/create", createResidency)

export {router as residencyRoute}