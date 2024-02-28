import CryptoJS from "crypto-js";
import { STATUS_CODE } from "../utils/common.js";
import { validateOwnerDetails } from "../validations/owner.validations.js";
import ownerService from "../services/owner.service.js";
import env from "../../config/env.js";

const create = async (req, res) => {
    try {
        const { body } = req;

        // decrypt and verify the password
        const depass = CryptoJS.AES.decrypt(body.password, env.cryptoSecret).toString(CryptoJS.enc.Utf8);     
        const payloadValidation = validateOwnerDetails({ ...body, password: depass, zipCode: body.zipCode.toString() });
        if (payloadValidation.error) {
            return res.status(STATUS_CODE.BAD_GATEWAY).send({ message: payloadValidation.error.message });
        }

        // register the owner with details
        return res.status(STATUS_CODE.CREATED).send(await ownerService.create(body));
    } catch (error) {
        console.log(`Failed to register owner ${error}`);
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
}

export default {
    create
}
