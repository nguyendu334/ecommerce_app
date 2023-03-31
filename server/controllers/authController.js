import userModel from '../models/userModel.js';
import { hashPassword } from './../helpers/authHelper.js';

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
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};

export const loginController = () => {};
