import express from 'express';
import validator from '../middlewares/validate.js';
import {
    loginController,
    registerController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
} from '../controllers/authController.js';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', validator('register'), registerController);
router.post('/login', loginController);

// forgot pasword
router.post('/forgot-password', validator('forgotPassword'), forgotPasswordController);

// test route
router.get('/', requireSignIn, isAdmin, testController);

// protected user route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({
        ok: true,
    });
});

// protected addmin route
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({
        ok: true,
    });
});

// update profile
router.put('/profile', requireSignIn, updateProfileController);

// orders
router.get('/orders', requireSignIn, getOrdersController);
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);

// orders update
router.put('/orders-status/:orderId', requireSignIn, isAdmin, orderStatusController);

export default router;
