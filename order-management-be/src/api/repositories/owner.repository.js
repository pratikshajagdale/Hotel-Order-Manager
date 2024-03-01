import { db } from "../../config/database.js";
import { CustomError } from "../utils/common.js";

const save = async (payload) => {
    try {
        return await db.owners.create(payload);   
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

const findOne = async( payload ) => {
    try {
        return await db.owners.findOne({ where: payload });   
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

export default { save, findOne };
