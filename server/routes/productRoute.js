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
    productFiltersController,
    productCountController,
    productListController,
    searchProductController,
    relatedProductController,
    productCategoryController,
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

// filter product
router.post('/product-filters', productFiltersController);

// product count
router.get('/product-count', productCountController);

// product per page
router.get('/product-list/:page', productListController);

// search product
router.get('/search/:keyword', searchProductController);

// Similar product
router.get('/related-product/:pid/:cid', relatedProductController);

// category product
router.get('/product-category/:slug', productCategoryController);

export default router;
