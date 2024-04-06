import { db } from "../../config/database.js";
import { CustomError } from "../utils/common.js";

const save = async (payload) => {
    try {
        return await db.invites.create(payload);   
    } catch (error) {
        console.log(error);
        const err = error?.errors[0]?.message;
        throw CustomError(error.code, (err || error.message));
    }
}

const update = async (options, data) => {
    try {
        return await db.invites.update(data, options);
    } catch (error) {
        const err = error?.errors[0]?.message;
        throw CustomError(error.code, (err || error.message));
    }
}

const find = async (options) => {
    try {
        return await db.invites.findAndCountAll(options);
    } catch (error) {
        console.log(error);
        const err = error?.errors[0]?.message;
        throw CustomError(error.code, (err || error.message));
    }
}

const remove = async (options) => {
    try {
        return await db.invites.destroy(options);
    } catch (error) {
        console.log(error);
        const err = error?.errors[0]?.message;
        throw CustomError(error.code, (err || error.message));
    }
}

export default { save, update, find , remove };
