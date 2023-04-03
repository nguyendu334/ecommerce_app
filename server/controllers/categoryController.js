import categoryModel from '../models/CategoryModel.js';
import slugify from 'slugify';

// create category
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category already exists',
            });
        }
        const category = await new categoryModel({
            name,
            slug: slugify(name),
        }).save();
        res.status(201).send({
            success: true,
            message: 'Category created successfully',
            category,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Server Error in Category',
            error: error.message,
        });
    }
};

// update category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true },
        );
        res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            category,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Server Error in Category',
            error: error.message,
        });
    }
};

// get all categories
export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: 'All categories',
            category,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while getting all categories',
            error: error.message,
        });
    }
};

// get single category
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: 'Get Single category Successfully',
            category,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while getting all categories',
            error: error.message,
        });
    }
};

// delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'Category deleted successfully',
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while deleting category',
            error: error.message,
        });
    }
}
