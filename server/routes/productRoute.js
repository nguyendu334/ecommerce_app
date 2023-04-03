import express from 'express';
import formidable from 'express-formidable';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {
    createProductController,
    updateProductController,
    getAllProductsController,
    getSingleProductController,
    getProductPhotoController,
    deleteProductController,
} from '../controllers/productController.js';

const router = express.Router();

// create product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// update product
router.put('/update-product/:id', requireSignIn, isAdmin, formidable(), updateProductController);

// get all products
router.get('/get-product', getAllProductsController);

// get single product
router.get('/get-product/:slug', getSingleProductController);

// get photo
router.get('/product-photo/:id', getProductPhotoController);

// delete product
router.delete('/delete-product/:id', requireSignIn, isAdmin, deleteProductController);

export default router;
