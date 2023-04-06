import productModel from '../models/productModel.js';
import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';
import fs from 'fs';

// create product
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' });
            case !description:
                return res.status(500).send({ error: 'Description is required' });
            case !price:
                return res.status(500).send({ error: 'Price is required' });
            case !category:
                return res.status(500).send({ error: 'Category is required' });
            case !quantity:
                return res.status(500).send({ error: 'Quantity is required' });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: 'Photo is required and should be less then 1mb' });
        }
        const products = new productModel({
            ...req.fields,
            slug: slugify(name),
        });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product Created Successfully',
            products,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Creating Product',
            error: error.message,
        });
    }
};

// update product
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' });
            case !description:
                return res.status(500).send({ error: 'Description is required' });
            case !price:
                return res.status(500).send({ error: 'Price is required' });
            case !category:
                return res.status(500).send({ error: 'Category is required' });
            case !quantity:
                return res.status(500).send({ error: 'Quantity is required' });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: 'Photo is required and should be less then 1mb' });
        }
        const products = await productModel.findOneAndUpdate(
            req.params.id,
            {
                ...req.fields,
                slug: slugify(name),
            },
            { new: true },
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product Created Successfully',
            products,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Updating Product',
            error: error.message,
        });
    }
};

// get all products
export const getAllProductsController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .select('-photo')
            .populate('category')
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: 'All Products',
            countTotal: products.length,
            products,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Getting Product',
            error: error.message,
        });
    }
};

// get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select('-photo')
            .populate('category');
        res.status(200).send({
            success: true,
            message: 'Single Product',
            product,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Getting Product',
            error: error.message,
        });
    }
};

// get photo
export const getProductPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id).select('photo');
        if (product.photo.data) {
            res.set('Content-Type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Getting Photo',
            error: error.message,
        });
    }
};

// delete product
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id).select('-photo');
        res.status(200).send({
            success: true,
            message: 'Product Deleted Successfully',
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Deleting Product',
            error: error.message,
        });
    }
};

//  filter products
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error WHile Filtering Products',
            error,
        });
    }
};

// product count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount().exec();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error WHile Filtering Products',
            error,
        });
    }
};

// product list
export const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select('-photo')
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error While Filtering Products',
            error,
        });
    }
};

// search product
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                ],
            })
            .select('-photo');
        res.json(results);
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error While Searching Products',
            error,
        });
    }
};

// related products
export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select('-photo')
            .limit(3)
            .populate('category');
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error while getting ralated Products',
            error,
        });
    }
};

// product category
export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate('category');
        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: 'Error While Getting products',
        });
    }
};
