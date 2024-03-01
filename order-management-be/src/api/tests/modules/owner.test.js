import ownerController from "../../controllers/owner.controllers";
import { db } from "../../../config/database";
import dummyData from "../utils/dummy.owner";

// mock the database operations
jest.mock('../../../config/database.js', () => ({
    db: {
        owners: {
            create: jest.fn(),
            findOne: jest.fn()
        }
    }
}));

// mock the email sending functions
jest.mock('../../../config/email.js', () => ({ transporter: { sendMail: jest.fn() } }));

// mocking console logs
console.log = jest.fn();

// mocking express res
const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
};

describe('testing owner cases', () => {
    // Register owner test cases
    test('test invalid email to register a user', async () => {
        const { invalidEmailData } = dummyData;
         await ownerController.create({ body: invalidEmailData.body }, res);

        // Status code should be 400
        expect(res.status).toHaveBeenCalledWith(invalidEmailData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(invalidEmailData.res.data);
    });

    test('test invalid password to register a user', async () => {
        const { invalidPasswordData } = dummyData;
        await ownerController.create({ body: invalidPasswordData.body }, res);

        // Status code should be 400
        expect(res.status).toHaveBeenCalledWith(invalidPasswordData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        const data = res.send.mock.calls[0][0];
        expect(data).toHaveProperty('message');
        expect(data.message).toContain(invalidPasswordData.res.data.message);
    });

    test('test invalid phone number to register a user', async () => {
        const { invalidPhoneData } = dummyData;
        await ownerController.create({ body: invalidPhoneData.body }, res);

        // Status code should be 400
        expect(res.status).toHaveBeenCalledWith(invalidPhoneData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(invalidPhoneData.res.data);
    });

    test('test invalid body to register a user', async () => {
        const { invalidData } = dummyData;
        await ownerController.create({ body: invalidData.body }, res);

        // Status code should be 400
        expect(res.status).toHaveBeenCalledWith(invalidData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(invalidData.res.data);
    });

    test('test successful register of owner', async () => {
        const { owner } = dummyData;
        // mock owner details
        db.owners.create.mockResolvedValue(owner.db)

        await ownerController.create({ body: owner.body }, res);
        
        // Status code should be 201
        expect(res.status).toHaveBeenCalledWith(owner.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);
        
        // expected response should match the owner details from mocked database
        expect(res.send).toHaveBeenCalledWith(owner.db);
    });

    // Login owner test cases
    test('test email not registered', async () => {        
        const { unregisteredEmailData } = dummyData;

        db.owners.findOne.mockResolvedValue(undefined);
        await ownerController.login({ body: unregisteredEmailData.body }, res);

        // Status code should be 404
        expect(res.status).toHaveBeenCalledWith(unregisteredEmailData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        // compare the error message
        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(unregisteredEmailData.res.data);
    })

    test('test invalid password', async () => {
        const { incorrectPasswordData } = dummyData;

        db.owners.findOne.mockResolvedValue(incorrectPasswordData.db);
        await ownerController.login({ body: incorrectPasswordData.body }, res);

        // Status code should be 401
        expect(res.status).toHaveBeenCalledWith(incorrectPasswordData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        // compare the error message
        const data = res.send.mock.calls[0][0];
        expect(data).toHaveProperty('message');
        expect(data.message).toEqual(incorrectPasswordData.res.data.message);

    })

    test('test email not verified', async () => {
        const { inActiveData } = dummyData;

        db.owners.findOne.mockResolvedValue(inActiveData.db);
        await ownerController.login({ body: inActiveData.body }, res);

        // Status code should be 401
        expect(res.status).toHaveBeenCalledWith(inActiveData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        // compare the error message
        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(inActiveData.res.data);
    })

    test('test successful login of owner', async () => {
        const { successLoginData } = dummyData;

        db.owners.findOne.mockResolvedValue(successLoginData.db);
        await ownerController.login({ body: successLoginData.body }, res);

        // Status code should be 200
        expect(res.status).toHaveBeenCalledWith(successLoginData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        // compare the error message
        const data = res.send.mock.calls[0][0];
        expect(data).toHaveProperty('token');
        expect(data).toHaveProperty('data');
        expect(data.data).toEqual(successLoginData.db);

    })

    // verify test cases
    test('test user already verified', async () => {
        const { userAlreadyVerifiedData } = dummyData;

        db.owners.findOne.mockResolvedValue(userAlreadyVerifiedData.db);
        await ownerController.verify({ body: userAlreadyVerifiedData.body }, res);

        // Status code should be 400
        expect(res.status).toHaveBeenCalledWith(userAlreadyVerifiedData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        // compare the error message
        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(userAlreadyVerifiedData.res.data);
    })

    test('test expired link', async () => {
        const { linkExpiredData } = dummyData;

        db.owners.findOne.mockResolvedValue(linkExpiredData.db);
        await ownerController.verify({ body: linkExpiredData.body }, res);

        // Status code should be 410
        expect(res.status).toHaveBeenCalledWith(linkExpiredData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        // compare the error message
        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(linkExpiredData.res.data);
    })

    test('test verify email', async () => {
        const { verifyEmailData } = dummyData;

        verifyEmailData.db.save = jest.fn();
        db.owners.findOne.mockResolvedValue(verifyEmailData.db);
        await ownerController.verify({ body: verifyEmailData.body }, res);

        // Status code should be 200
        expect(res.status).toHaveBeenCalledWith(verifyEmailData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        // compare the error message
        const data = res.send.mock.calls[0][0];
        expect(data).toHaveProperty('token');
        expect(data).toHaveProperty('data');
        expect(data.data.status).toEqual(verifyEmailData.res.data.status);

    })

    // forgot password test cases
    test('test not verified user', async () => {
        const { unverifiedData } = dummyData;

        db.owners.findOne.mockResolvedValue(unverifiedData.db);
        await ownerController.forget({ body: unverifiedData.body }, res);

        // Status code should be 403
        expect(res.status).toHaveBeenCalledWith(unverifiedData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        // compare the error message
        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(unverifiedData.res.data);
    })

    test('test forgot password', async () => {
        const { forgotPasswordData } = dummyData;

        db.owners.findOne.mockResolvedValue(forgotPasswordData.db);
        await ownerController.forget({ body: forgotPasswordData.body }, res);

        // Status code should be 200
        expect(res.status).toHaveBeenCalledWith(forgotPasswordData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        // compare the error message
        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(forgotPasswordData.res.data);
    })

    // reset password
    test('test to reset password', async () => {
        const { resetPasswordData } = dummyData;

        resetPasswordData.db.save = jest.fn();
        db.owners.findOne.mockResolvedValue(resetPasswordData.db);
        await ownerController.reset({ body: resetPasswordData.body }, res);

        // Status code should be 200
        expect(res.status).toHaveBeenCalledWith(resetPasswordData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        // compare the error message
        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(resetPasswordData.res.data);
        expect(resetPasswordData.db.password).toEqual(resetPasswordData.body.newPassword);
    })
});
