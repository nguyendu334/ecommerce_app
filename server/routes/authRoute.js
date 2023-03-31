import express from "express";

import validator from '../middlewares/validate.js';
import { loginController, registerController, testController } from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register',validator('register'), registerController);
router.post('/login', loginController);

// test route
router.get('/', requireSignIn, isAdmin, testController)

export default router;