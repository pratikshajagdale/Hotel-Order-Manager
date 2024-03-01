import Joi from "joi";

export const registrationValidation = ( payload ) => {
    try {
        const schema = Joi.object({
            firstName: Joi.string().min(3).max(30).required(),
            lastName: Joi.string().min(3).max(30).required(),
            phoneNumber: Joi.number().min(10 ** 9).max(10 ** 10 - 1).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)),
            addressLine1: Joi.string().required(),
            addressLine2: Joi.string(),
            city: Joi.string().required().required(),
            state: Joi.string().required().required(),
            zipCode: Joi.string().min(6).max(6).required()
        });
    
        return schema.validate(payload);   
    } catch (error) {
        console.log(`Error in validating register details ${error.message}`);
    }
}

export const loginValidation = (payload) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)),
        });
    
        return schema.validate(payload);   
    } catch (error) {
        console.log(`Error in validation login details ${error.message}`);
    }
}

export const passValidation = (payload) => {
    try {
        const schema = Joi.object({
            password: Joi.string().pattern(new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)),
        });
    
        return schema.validate(payload);   
    } catch (error) {
        console.log(`Error in validation login details ${error.message}`);
    }
}
