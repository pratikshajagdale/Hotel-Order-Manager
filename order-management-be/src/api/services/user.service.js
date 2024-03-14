import { v4 as uuidv4 } from 'uuid';
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import userRepo from "../repositories/user.repository.js";
import { roles, status } from "../models/user.model.js";
import { sendEmail } from "./email.service.js";
import env from '../../config/env.js';
import moment from 'moment';
import { EMAIL_ACTIONS, CustomError, STATUS_CODE } from '../utils/common.js';

const create = async ( payload ) => {
    try {
        // create payload of user data
        const user = {
            id: uuidv4(),
            firstName: payload.firstName,
            lastName: payload.lastName,
            phoneNumber: payload.phoneNumber,
            email: payload.email,
            password: payload.password,
            status: status[1],
            role: roles[0]
        }
        // save the user details to the database
        const data = await userRepo.save( user );
        // send verification email to the user
        const verifyOptions = {
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            expires: moment().add(1, 'hour').valueOf(),
        };

        const token = CryptoJS.AES.encrypt(JSON.stringify(verifyOptions), env.cryptoSecret).toString();
        await sendEmail(token, user.email, EMAIL_ACTIONS.VERIFY_USER);
        return data;
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

const login = async ( payload ) => {
    try {
        const { email, password } = payload;
        const user = await userRepo.findOne({ email });
        if (!user) {
            throw CustomError(STATUS_CODE.NOT_FOUND, 'Email not registered');
        }

        const pass = CryptoJS.AES.decrypt(user.password, env.cryptoSecret).toString(CryptoJS.enc.Utf8);
        if( password !== pass ) {
            throw CustomError(STATUS_CODE.UNAUTHORIZED, 'Invalid password');
        }

        if ( user.status === status[1] ) {
            throw CustomError(STATUS_CODE.FORBIDDEN, 'Email not verified');
        }

        const { id, firstName, lastName } = user;
        const token = jwt.sign({ id, firstName, lastName, status: user.status }, env.jwtSecret, { expiresIn: '12h' });
        return {
            token,
            data: user
        };
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

const verify = async ( payload ) => {   
    try {
        const { email, expires } = payload;
        const user = await userRepo.findOne({ email });
        if (!user) {
            throw CustomError(STATUS_CODE.NOT_FOUND, 'Invalid request');
        }

        if (user.status === status[0]) {
            throw CustomError(STATUS_CODE.BAD_REQUEST, 'User already verified Please try login');
        }

        if (moment().valueOf() > expires) {
            const verifyOptions = {
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                expires: moment().add(1, 'hour').valueOf(),
            };
            const token = CryptoJS.AES.encrypt(JSON.stringify(verifyOptions), env.cryptoSecret).toString();
            await sendEmail(token, user.email, EMAIL_ACTIONS.VERIFY_USER);
            throw CustomError(STATUS_CODE.GONE, `Sorry, the link has expired. We've sent a new one to your email. Please check and try again.`);
        }

        user.status = status[0];
        await user.save();

        const { id, firstName, lastName } = user;
        const token = jwt.sign({ id, firstName, lastName, status: user.status }, env.jwtSecret, { expiresIn: '12h' });
        return {
            token,
            data: user
        };
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

const forget = async ( payload ) => {
    try {
        const { email } = payload;
        
        const user = await userRepo.findOne({ email });
        if( !user ) {
            throw CustomError(STATUS_CODE.BAD_REQUEST, 'Invalid Email');
        }

        if (user.status === status[1]) {
            throw CustomError(STATUS_CODE.FORBIDDEN, 'User has not verified email');
        }
        // send verification email to the user
        const verifyOptions = {
            email: user.email,
            expires: moment().add(1, 'hour').valueOf()
        };

        const token = CryptoJS.AES.encrypt(JSON.stringify(verifyOptions), env.cryptoSecret).toString();
        await sendEmail(token, user.email, EMAIL_ACTIONS.FORGOT_PASSWORD);
        return { message: 'Recover password link sent. Please check your email.' }
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

const reset = async ( payload ) => {
    try {
        const { email, newPassword, expires } = payload;
        const user = await userRepo.findOne({ email });
        if (!user) {
            throw CustomError(STATUS_CODE.BAD_REQUEST, 'Invalid request');
        }

        if (user.status === status[1]) {
            throw CustomError(STATUS_CODE.FORBIDDEN, 'User has not verified email');
        }

        if (moment().valueOf() > expires) {
            const options = {
                email: user.email,
                password: user.password,
                expires: moment().add(1, 'hour').valueOf(),
            };
            const token = CryptoJS.AES.encrypt(JSON.stringify(options), env.cryptoSecret).toString();
            await sendEmail(token, user.email, EMAIL_ACTIONS.FORGOT_PASSWORD);
            throw CustomError(STATUS_CODE.GONE, `Sorry, the link has expired. We've sent a new one to your email. Please check and try again.`);
        }

        user.password = newPassword;
        await user.save();
        return { message: 'Password reset successfully' };
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

export default { create, login, verify, forget, reset };
