import * as Yup from 'yup';
import { emailRegex } from './auth';

export const managerSchema = Yup.object().shape({
    name: Yup.string().min(3).max(30).required('Manager Name is required'),
    hotelName: Yup.string().min(3).max(30).required('Hotel Name is required'),
    phoneNumber: Yup.string().min(10).max(10).required('Phone Number is required'),
    email: Yup.string().matches(emailRegex, 'Invalid email').required('Email is required'),
    address: Yup.string().min(3).max(30).required('Address is required')
});
