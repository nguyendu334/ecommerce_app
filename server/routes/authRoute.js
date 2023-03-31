import express from "express";
import validator from '../middlewares/validate.js';

import { registerController } from "../controllers/authController.js";

const router = express.Router();

router.post('/register',validator('register'), registerController);

export default router;