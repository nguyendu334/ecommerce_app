import express from "express";

import validator from '../middlewares/validate.js';
import { loginController, registerController } from "../controllers/authController.js";

const router = express.Router();

router.post('/register',validator('register'), registerController);
router.post('/login', loginController);

export default router;