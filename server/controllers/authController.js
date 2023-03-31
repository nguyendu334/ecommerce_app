import userModel from '../models/userModel.js';
import { hashPassword, comparePassword } from './../helpers/authHelper.js';
import jwt from 'jsonwebtoken';

// Register Controller
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
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
            },
            token,
        })
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
    })
}
