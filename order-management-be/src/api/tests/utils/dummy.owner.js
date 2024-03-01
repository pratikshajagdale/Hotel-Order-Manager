export const invalidEmaildata = {
    firstName: 'test',
    lastName: 'test',
    phoneNumber: 1234567890,
    email: 'test$test.vi', // invalid email
    password: 'U2FsdGVkX1/M/nm/UED5QUvoaIEZMa5p9y7ePJ0r8ik=',
    addressLine1: 'test',
    addressLine2: 'test',
    city: 'test',
    state: 'test',
    zipCode: 123456,
};
export const invalidEmailMessage = '"email" must be a valid email';

export const invalidPassworddata = {
    firstName: 'test',
    lastName: 'test',
    phoneNumber: 1234567890,
    email: 'test@test.com',
    password: 'U2FsdGVkX1+hsiMAdRRWOn8GAzrrRJSF/R4DTrRUxiM=', // inavlid password Test1234
    addressLine1: 'test',
    addressLine2: 'test',
    city: 'test',
    state: 'test',
    zipCode: 123456,
};
export const invalidPassMessage = '"password" with value "Test1234" fails to match the required pattern';

export const invalidPhonedata = {
    firstName: 'test',
    lastName: 'test',
    phoneNumber: 123456789, // invalid phone with 9 digits 
    email: 'test@test.com',
    password: 'U2FsdGVkX1/M/nm/UED5QUvoaIEZMa5p9y7ePJ0r8ik=',
    addressLine1: 'test',
    addressLine2: 'test',
    city: 'test',
    state: 'test',
    zipCode: 123456,
};
export const invalidPhoneMessage = '"phoneNumber" must be greater than or equal to 1000000000';

export const invalidData = {
    phoneNumber: 1234567890, 
    email: 'test@test.com',
    password: 'U2FsdGVkX1/M/nm/UED5QUvoaIEZMa5p9y7ePJ0r8ik=',
    city: 'test',
    state: 'test',
    zipCode: 123456,
};
export const invalidDataMessage = '"firstName" is required';

export const owner = {
    firstName: 'test',
    lastName: 'test',
    phoneNumber: 1234567890,
    email: 'test@test.com',
    password: 'U2FsdGVkX1/M/nm/UED5QUvoaIEZMa5p9y7ePJ0r8ik=',
    addressLine1: 'test',
    addressLine2: 'test',
    city: 'test',
    state: 'test',
    zipCode: 123456,
};

export const ownerResponse = {
    id: '60c688d6-5442-4569-9c8c-3f973b3ba554',
    firstName: 'test',
    lastName: 'test',
    phoneNumber: 1234567890,
    email: 'test@test.com',
    addressLine1: 'test',
    addressLine2: 'test',
    city: 'test',
    state: 'test',
    zipCode: 123456,
};