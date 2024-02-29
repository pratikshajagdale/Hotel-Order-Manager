import { db } from "../../config/database.js";

const save = async (payload) => {
    try {
        return await db.owners.create(payload);   
    } catch (error) {
        throw error;
    }
}

export default {
    save
}
