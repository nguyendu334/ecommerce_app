import express from 'express';
import validator from '../middlewares/validate.js';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import {
    createCategoryController,
    updateCategoryController,
    categoryController,
    singleCategoryController,
    deleteCategoryController,
} from '../controllers/categoryController.js';

const router = express.Router();

// create category
router.post(
    '/create-category',
    requireSignIn,
    isAdmin,
    validator('createCategory'),
    createCategoryController,
);

// update category
router.put(
    '/update-category/:id',
    requireSignIn,
    isAdmin,
    validator('createCategory'),
    updateCategoryController,
);

// Get all categories
router.get('/get-category', categoryController);

// Get single category
router.get('/get-category/:slug', singleCategoryController);

// delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

export default router;
