import { v4 as uuidv4 } from 'uuid';
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import userRepo from "../repositories/user.repository.js";
import inviteRepo from "../repositories/invite.repository.js";
import { USER_ROLES, USER_STATUS } from "../models/user.model.js";
import { sendEmail } from "./email.service.js";
import env from '../../config/env.js';
import moment from 'moment';
import { EMAIL_ACTIONS, CustomError, STATUS_CODE } from '../utils/common.js';
import { INVITE_STATUS } from '../models/invite.model.js';
import { Op } from 'sequelize';

const create = async (payload) => {
    try {
        // check if invited user
        if (payload.invite) {
            await inviteRepo.update({ id: payload.invite }, { status: INVITE_STATUS[1] });
        }

        // create payload of user data
        const user = {
            id: uuidv4(),
            firstName: payload.firstName,
            lastName: payload.lastName,
            phoneNumber: payload.phoneNumber,
            email: payload.email,
            password: payload.password,
            status: USER_STATUS[1],
            role: payload.invite ? USER_ROLES[1] : USER_ROLES[0]
        }
        // save the user details to the database
        const data = await userRepo.save(user);
        // send verification email to the user
        const verifyOptions = {
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            expires: moment().add(1, 'hour').valueOf(),
        };

        const token = CryptoJS.AES.encrypt(JSON.stringify(verifyOptions), env.cryptoSecret).toString();
        await sendEmail({ token }, user.email, EMAIL_ACTIONS.VERIFY_USER);
        return data;
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

const login = async (payload) => {
    try {
        const { email, password } = payload;
        const user = await userRepo.findOne({ email });
        if (!user) {
            throw CustomError(STATUS_CODE.NOT_FOUND, 'Email not registered');
        }

        const pass = CryptoJS.AES.decrypt(user.password, env.cryptoSecret).toString(CryptoJS.enc.Utf8);
        if (password !== pass) {
            throw CustomError(STATUS_CODE.UNAUTHORIZED, 'Invalid password');
        }

        if (user.status === USER_STATUS[1]) {
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

const verify = async (payload) => {
    try {
        const { email, expires } = payload;
        const user = await userRepo.findOne({ email });
        if (!user) {
            throw CustomError(STATUS_CODE.NOT_FOUND, 'Invalid request');
        }

        if (user.status === USER_STATUS[0]) {
            throw CustomError(STATUS_CODE.BAD_REQUEST, 'User already verified Please try login');
        }

        if (moment().valueOf() > expires) {
            const verifyOptions = {
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                expires: moment().add(1, 'hour').valueOf(),
            };
            const token = CryptoJS.AES.encrypt(JSON.stringify(verifyOptions), env.cryptoSecret).toString();
            await sendEmail({ token }, user.email, EMAIL_ACTIONS.VERIFY_USER);
            throw CustomError(STATUS_CODE.GONE, `Sorry, the link has expired. We've sent a new one to your email. Please check and try again.`);
        }

        user.status = USER_STATUS[0];
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

const forget = async (payload) => {
    try {
        const { email } = payload;

        const user = await userRepo.findOne({ email });
        if (!user) {
            throw CustomError(STATUS_CODE.BAD_REQUEST, 'Invalid Email');
        }

        if (user.status === USER_STATUS[1]) {
            throw CustomError(STATUS_CODE.FORBIDDEN, 'User has not verified email');
        }
        // send verification email to the user
        const verifyOptions = {
            email: user.email,
            expires: moment().add(1, 'hour').valueOf()
        };

        const token = CryptoJS.AES.encrypt(JSON.stringify(verifyOptions), env.cryptoSecret).toString();
        await sendEmail({ token }, user.email, EMAIL_ACTIONS.FORGOT_PASSWORD);
        return { message: 'Recover password link sent. Please check your email.' }
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

const reset = async (payload) => {
    try {
        const { email, newPassword, expires } = payload;
        const user = await userRepo.findOne({ email });
        if (!user) {
            throw CustomError(STATUS_CODE.BAD_REQUEST, 'Invalid request');
        }

        if (user.status === USER_STATUS[1]) {
            throw CustomError(STATUS_CODE.FORBIDDEN, 'User has not verified email');
        }

        if (moment().valueOf() > expires) {
            const options = {
                email: user.email,
                password: user.password,
                expires: moment().add(1, 'hour').valueOf(),
            };
            const token = CryptoJS.AES.encrypt(JSON.stringify(options), env.cryptoSecret).toString();
            await sendEmail({ token }, user.email, EMAIL_ACTIONS.FORGOT_PASSWORD);
            throw CustomError(STATUS_CODE.GONE, `Sorry, the link has expired. We've sent a new one to your email. Please check and try again.`);
        }

        user.password = newPassword;
        await user.save();
        return { message: 'Password reset successfully' };
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

const invite = async (payload) => {
    try {
        const { email } = payload;
        const data = {
            id: uuidv4(),
            email: payload.email,
            status: INVITE_STATUS[0],
            ownerId: payload.owner
        }
        // save the invite details to the database
        const inviteData = await inviteRepo.save(data);

        const options = {
            email,
            inviteId: inviteData.id,
            expires: moment().add(1, 'hour').valueOf()
        };

        const token = CryptoJS.AES.encrypt(JSON.stringify(options), env.cryptoSecret).toString();
        await sendEmail({ token, name: payload.name }, email, EMAIL_ACTIONS.INVITE_ADMIN);
        return { message: 'Invite link sent' };
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

const listInvites = async (payload) => {
    try {
        const { owner, limit, skip, sort_key, sort_order, filter_key, filter_value } = payload;
        const defaults = {
            sort_key: 'updatedAt',
            sort_order: 'DESC',
            limit: 10,
            offset: 0
        }

        let where = { ownerId: owner };
        if (filter_key && filter_value) {
            where = {
                [Op.and]: [
                    { ownerId: owner },
                    { [filter_key]: {
                        [Op.like]: `%${filter_value}%`
                    }}
                ]
            }
        }

        const options = {
            where,
            order: [[ (sort_key || defaults.sort_key), (sort_order || defaults.sort_order) ]],
            offset: Number(skip) || defaults.offset,
            limit: Number(limit) || defaults.limit
        }
        return await inviteRepo.find(options);
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

const removeInvite = async (id) => {
    try {
        const data = await inviteRepo.find({ where: { id } });
        if (!data.rows.length) {
            await inviteRepo.remove({ where: { id } });
            throw CustomError(STATUS_CODE.NOT_FOUND, 'Invited user not found');
        }

        if (data.rows[0].status === INVITE_STATUS[1]) {
            throw CustomError(STATUS_CODE.BAD_REQUEST, 'Invited user is active');
        }

        const options = {
            where: {
                id,
                status: INVITE_STATUS[0]
            }
        }
        await inviteRepo.remove(options);
        return { message: 'Invite deleted successfully' };
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

export default {
    create,
    login,
    verify,
    forget,
    reset,
    invite,
    listInvites,
    removeInvite
};
