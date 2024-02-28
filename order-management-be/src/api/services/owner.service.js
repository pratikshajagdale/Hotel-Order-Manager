import { status } from "../models/owner.model.js";
import ownerRepo from "../repositories/owner.repository.js";
import { v4 as uuidv4 } from 'uuid';
import { sendOwnerVerificatonEmail } from "./email.service.js";

const create = async ( payload ) => {
    try {
        // create payload of user data
        const ownerData = {
            id: uuidv4(),
            firstname: payload.firstName,
            lastName: payload.lastName,
            phone: payload.phoneNumber,
            email: payload.email,
            password: payload.password,
            addressLine1: payload.addressLine1,
            addressLine2: payload.addressLine2,
            city: payload.city,
            state: payload.state,
            zipCode: payload.zip,
            gender: payload.gender,
            status: status[1]
        }
        await sendOwnerVerificatonEmail( ownerData.email );        
        return await ownerRepo.save( ownerData );
    } catch (error) {
        throw error;
    }
}

export default {
    create
}
