//Validation
const Joi = require('@hapi/joi');

//register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });


    return schema.validate(data);
};

//register validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });


    return schema.validate(data);
};

//timesheetitem validation
const timesheetItemValidation = (data) => {
    const schema = Joi.object({
        user_id: Joi.string().min(3).required(),
        start_time: Joi.string().min(3).required(),
        end_time: Joi.string().min(3).required(),
        discription: Joi.string().min(3).required()
    });


    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.timesheetItemValidation = timesheetItemValidation;
