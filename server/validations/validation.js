import Joi from 'joi';

const register = Joi.object({
    name: Joi.string().min(1).max(20).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required(),
    phone: Joi.string().min(10).max(10).required(),
    address: Joi.string().min(1).max(50).required(),
    answer: Joi.string().min(1).max(50).required(),
});

const login = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required(),
})

const forgotPassword = Joi.object({
    email: Joi.string().email().lowercase().required(),
    answer: Joi.string().min(1).max(50).required(),
    newPassword: Joi.string().required(),
})

const createCategory = Joi.object({
    name: Joi.string().min(1).max(50).required(),
})

export default { register,login, forgotPassword, createCategory };
