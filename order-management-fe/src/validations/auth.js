import * as Yup from 'yup';

export const ownerRegisterationSchema = Yup.object().shape({
    firstName: Yup.string().min(3).max(30).required('First Name is required'),
    lastName: Yup.string().min(3).max(30).required('Last Name is required'),
    phoneNumber: Yup.string().min(10).max(10).required('Phone Number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, one letter, one number, and one special character'
    ).required('Password is required'),    
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required(),
    addressLine1: Yup.string().required('Address Line 1 is required'),
    addressLine2: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().min(6).max(6).required('Zip Code is required'),
});

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, one letter, one number, and one special character'
    ).required('Password is required'),
});

export const emailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
});

export const passwordSchema = Yup.object().shape({
    password: Yup.string().matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, one letter, one number, and one special character'
    ).required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required(),
});
