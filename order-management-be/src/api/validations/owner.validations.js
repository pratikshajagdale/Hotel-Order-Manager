import Joi from "joi";

export const validateOwnerDetails = ( payload ) => {
    try {
        const ownerSchema = Joi.object({
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
    
        return ownerSchema.validate(payload);   
    } catch (error) {
        console.log(`Error in validating owner details ${error.message}`);
    }
}
