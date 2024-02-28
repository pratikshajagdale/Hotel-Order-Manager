import { v4 as uuidv4 } from 'uuid';
import { status } from "../models/owner.model.js";
import ownerRepo from "../repositories/owner.repository.js";
import { sendOwnerVerificatonEmail } from "./email.service.js";

const create = async ( payload ) => {
    try {
        // create payload of user data
        const ownerData = {
            id: uuidv4(),
            firstName: payload.firstName,
            lastName: payload.lastName,
            phoneNumber: payload.phoneNumber,
            email: payload.email,
            password: payload.password,
            addressLine1: payload.addressLine1,
            addressLine2: payload.addressLine2,
            city: payload.city,
            state: payload.state,
            zipCode: payload.zipCode,
            status: status[1]
        }

        // send verification email to the owner
        await sendOwnerVerificatonEmail( ownerData.email );        

        // save the owner details to the database
        return await ownerRepo.save( ownerData );
    } catch (error) {
        throw error;
    }
}

export default {
    create
}
