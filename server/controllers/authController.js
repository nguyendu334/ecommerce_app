import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js';
import { hashPassword, comparePassword } from './../helpers/authHelper.js';
import jwt from 'jsonwebtoken';

// Register Controller
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            answer,
        }).save();
        res.status(201).send({
            success: true,
            message: 'Registration Successful',
            user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// Login Controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json('Incorrect email');
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            res.status(404).json('Incorrect password');
        }
        if (user && match) {
            const token = jwt.sign(
                {
                    id: user._id,
                },
                process.env.SECRET_KEY,
                {
                    expiresIn: '7d',
                },
            );
            res.status(200).send({
                success: true,
                message: 'Login Successful',
                user: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    role: user.role,
                },
                token,
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

// forgot password controller
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        const user = await userModel.findOne({ email, answer });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        const hashedPassword = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
        res.status(200).send({
            success: true,
            message: 'Password changed successfully',
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

export const testController = async (req, res) => {
    res.status(200).send({
        success: true,
        message: 'Test Successful',
    });
};

// update profile
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: 'Passsword is required and 6 character long' });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                address: address || user.address,
                phone: phone || user.phone,
            },
            { new: true },
        );
        res.status(200).send({
            success: true,
            message: 'Profile Updated SUccessfully',
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error While Update profile',
            error,
        });
    }
};

// get orders
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate('products', '-photo')
            .populate('buyer', 'name');
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error While Geting Orders',
            error,
        });
    }
};

// get all orders
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate('products', '-photo')
            .populate('buyer', 'name')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error While Geting Orders',
            error,
        });
    }
};

// update order status
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error While Updating Orders',
            error,
        });
    }
};
