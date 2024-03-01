import ownerController from "../../controllers/owner.controllers";
import { db } from "../../../config/database";
import { invalidData, invalidDataMessage, invalidEmailMessage, invalidEmaildata, invalidPassMessage, invalidPassworddata, invalidPhoneMessage, invalidPhonedata, owner, ownerResponse } from "../utils/dummy.owner";
import { STATUS_CODE } from "../../utils/common";

jest.mock('../../../config/database.js', () => ({
    db: {
        owners: {
            create: jest.fn()
        }
    }
}));

jest.mock('../../../config/email.js', () => ({
    transporter: {
        sendMail: jest.fn()
    }
}));

const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
};

describe('testing owner cases', () => {
    test('test invalid email to register a user', async () => {
        await ownerController.create({ body: invalidEmaildata }, res);

        // Status code should be 400
        expect(res.status).toHaveBeenCalledWith(STATUS_CODE.BAD_REQUEST);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        const message = res.send.mock.calls[0][0].message;
        expect(message).toEqual(invalidEmailMessage);
    });

    test('test invalid password to register a user', async () => {
        await ownerController.create({ body: invalidPassworddata }, res);

        // Status code should be 400
        expect(res.status).toHaveBeenCalledWith(STATUS_CODE.BAD_REQUEST);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        const message = res.send.mock.calls[0][0].message;
        expect(message).toContain(invalidPassMessage);
    });

    test('test invalid phone number to register a user', async () => {
        await ownerController.create({ body: invalidPhonedata }, res);

        // Status code should be 400
        expect(res.status).toHaveBeenCalledWith(STATUS_CODE.BAD_REQUEST);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        const message = res.send.mock.calls[0][0].message;
        expect(message).toEqual(invalidPhoneMessage);
    });

    test('test invalid body to register a user', async () => {
        await ownerController.create({ body: invalidData }, res);

        // Status code should be 400
        expect(res.status).toHaveBeenCalledWith(STATUS_CODE.BAD_REQUEST);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        const message = res.send.mock.calls[0][0].message;
        expect(message).toEqual(invalidDataMessage);
    });

    test('register an user', async () => {
        // mock owner details
        db.owners.create.mockResolvedValue(ownerResponse)

        await ownerController.create({ body: owner }, res);
        
        // Status code should be 201
        expect(res.status).toHaveBeenCalledWith(STATUS_CODE.CREATED);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);
        
        // expected response should match the owner details from mocked database
        expect(res.send).toHaveBeenCalledWith(ownerResponse);
    });
});
