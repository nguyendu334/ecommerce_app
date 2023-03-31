import Joi from 'joi';

const register = Joi.object({
    name: Joi.string().min(1).max(20).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().min(10).max(10).required(),
    address: Joi.string().min(1).max(50).required(),
});

export default { register };
