import { STATUS_CODE } from "../utils/common.js";
import { validateOwnerDetails } from "../validations/owner.validations.js";
import ownerService from "../services/owner.service.js";

const create = async (req, res) => {
    try {
        const { body } = req;
        const payloadValidation = validateOwnerDetails(body);
        if (payloadValidation.error) {
            return res.status(STATUS_CODE.BAD_GATEWAY).send({ ...payloadValidation.error });
        }
        return res.status(STATUS_CODE.CREATED).send(await ownerService.create(body));
    } catch (error) {
        console.log(`Failed to register owner ${error}`);
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
}

export default {
    create
}
