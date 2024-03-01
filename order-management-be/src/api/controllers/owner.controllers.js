import CryptoJS from "crypto-js";
import { STATUS_CODE } from "../utils/common.js";
import { loginValidation, passValidation, registrationValidation } from "../validations/owner.validations.js";
import ownerService from "../services/owner.service.js";
import env from "../../config/env.js";

const create = async (req, res) => {
    try {
        const { body } = req;

        // decrypt and verify the password
        const depass = CryptoJS.AES.decrypt(body.password, env.cryptoSecret).toString(CryptoJS.enc.Utf8);     
        const valid = registrationValidation({ ...body, password: depass, zipCode: body.zipCode.toString() });
        if (valid.error) {
            return res.status(STATUS_CODE.BAD_REQUEST).send({ message: valid.error.message });
        }

        // register the owner with details
        return res.status(STATUS_CODE.CREATED).send(await ownerService.create(body));
    } catch (error) {
        console.log(`Failed to register owner ${error}`);
        return res.status(error.code).send({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { body } = req;
        // decrypt and verify the password
        const depass = CryptoJS.AES.decrypt(body.password, env.cryptoSecret).toString(CryptoJS.enc.Utf8);     
        const valid = loginValidation({ ...body, password: depass });
        if (valid.error) {
            return res.status(STATUS_CODE.BAD_REQUEST).send({ message: valid.error.message });
        }

        return res.status(STATUS_CODE.CREATED).send(await ownerService.login({ ...body, password: depass }));
    } catch (error) {
        console.log(`Failed to login ${error}`);
        return res.status(error.code).send({ message: error.message });
    }
}

const verify = async (req, res) => {
    try {
        const { body } = req;
        return res.status(STATUS_CODE.CREATED).send(await ownerService.verify(body)); 
    } catch (error) {
        console.log(`Failed to login ${error}`);
        return res.status(error.code).send({ message: error.message });
    }
}

const forget = async (req, res) => {
    try {
        const { body } = req;
        return res.status(STATUS_CODE.CREATED).send(await ownerService.forget(body)); 
    } catch (error) {
        console.log(`Failed to send forgot password email ${error}`);
        return res.status(error.code).send({ message: error.message });
    }
}

const reset = async (req, res) => {
    try {
        const { body } = req;
        const depass = CryptoJS.AES.decrypt(body.newPassword, env.cryptoSecret).toString(CryptoJS.enc.Utf8);     
        const valid = passValidation({ password: depass });
        if (valid.error) {
            return res.status(STATUS_CODE.BAD_REQUEST).send({ message: valid.error.message });
        }
        return res.status(STATUS_CODE.CREATED).send(await ownerService.reset(body)); 
    } catch (error) {
        console.log(`Failed to reset password ${error}`);
        return res.status(error.code).send({ message: error.message });
    }
}

export default { create, login, verify, forget, reset };
