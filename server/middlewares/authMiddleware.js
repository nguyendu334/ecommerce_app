import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// protected routes token base
export const requireSignIn = (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error.message);
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (user.role !== 1) {
            return res.status(400).json('Admin resource. Access denied.');
        } else {
            next();
        }
    } catch (error) {
        res.status(401).send({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
}
