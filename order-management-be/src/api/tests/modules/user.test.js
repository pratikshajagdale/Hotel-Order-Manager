import userController from "../../controllers/user.controllers";
import { db } from "../../../config/database";
import dummyData from "../utils/dummy.user";

// mock the database operations
jest.mock('../../../config/database.js', () => ({
    db: {
        users: {
            create: jest.fn(),
            findOne: jest.fn()
        },
        invites: {
            create: jest.fn(),
            update: jest.fn(),
            findAndCountAll: jest.fn(),
            destroy: jest.fn()
        }
    }
}));

// mock the email sending functions
jest.mock('../../../config/email.js', () => ({ transporter: { sendMail: jest.fn() } }));

// mocking console logs
console.log = jest.fn();

// mocking express res
let res = {};

describe('testing user cases', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    })

    // Register user test cases
    test('test invalid email to register a user', async () => {
        const { invalidEmailData } = dummyData;
        await userController.create({ body: invalidEmailData.body }, res);

        // Status code should be 400
        expect(res.status).toHaveBeenCalledWith(invalidEmailData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(invalidEmailData.res.data);
    });

    test('test invalid password to register a user', async () => {
        const { invalidPasswordData } = dummyData;
        await userController.create({ body: invalidPasswordData.body }, res);

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
        await userController.create({ body: invalidPhoneData.body }, res);

        // Status code should be 400
        expect(res.status).toHaveBeenCalledWith(invalidPhoneData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(invalidPhoneData.res.data);
    });

    test('test invalid body to register a user', async () => {
        const { invalidData } = dummyData;
        await userController.create({ body: invalidData.body }, res);

        // Status code should be 400
        expect(res.status).toHaveBeenCalledWith(invalidData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(invalidData.res.data);
    });

    test('test successful register of user', async () => {
        const { user } = dummyData;
        // mock user details
        db.users.create.mockResolvedValue(user.db)

        await userController.create({ body: user.body }, res);

        // Status code should be 201
        expect(res.status).toHaveBeenCalledWith(user.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        // expected response should match the user details from mocked database
        expect(res.send).toHaveBeenCalledWith(user.db);
    });

    // Login user test cases
    test('test email not registered', async () => {
        const { unregisteredEmailData } = dummyData;

        db.users.findOne.mockResolvedValue(undefined);
        await userController.login({ body: unregisteredEmailData.body }, res);

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

        db.users.findOne.mockResolvedValue(incorrectPasswordData.db);
        await userController.login({ body: incorrectPasswordData.body }, res);

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

        db.users.findOne.mockResolvedValue(inActiveData.db);
        await userController.login({ body: inActiveData.body }, res);

        // Status code should be 401
        expect(res.status).toHaveBeenCalledWith(inActiveData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        // compare the error message
        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(inActiveData.res.data);
    })

    test('test successful login of user', async () => {
        const { successLoginData } = dummyData;

        db.users.findOne.mockResolvedValue(successLoginData.db);
        await userController.login({ body: successLoginData.body }, res);

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

        db.users.findOne.mockResolvedValue(userAlreadyVerifiedData.db);
        await userController.verify({ body: userAlreadyVerifiedData.body }, res);

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

        db.users.findOne.mockResolvedValue(linkExpiredData.db);
        await userController.verify({ body: linkExpiredData.body }, res);

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
        db.users.findOne.mockResolvedValue(verifyEmailData.db);
        await userController.verify({ body: verifyEmailData.body }, res);

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

        db.users.findOne.mockResolvedValue(unverifiedData.db);
        await userController.forget({ body: unverifiedData.body }, res);

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

        db.users.findOne.mockResolvedValue(forgotPasswordData.db);
        await userController.forget({ body: forgotPasswordData.body }, res);

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
        db.users.findOne.mockResolvedValue(resetPasswordData.db);
        await userController.reset({ body: resetPasswordData.body }, res);

        // Status code should be 200
        expect(res.status).toHaveBeenCalledWith(resetPasswordData.res.code);

        // The res.send function is called exactly ones
        expect(res.send.mock.calls).toHaveLength(1);

        // compare the error message
        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(resetPasswordData.res.data);
        expect(resetPasswordData.db.password).toEqual(resetPasswordData.body.newPassword);
    })


    // invite user
    test('test user invited successfully', async () => {
        const { inviteUser } = dummyData;

        db.invites.create.mockResolvedValue(inviteUser.db);
        await userController.invite({ body: { email: inviteUser.body.email }, user: inviteUser.body.user }, res);

        // database method got called
        expect(db.invites.create).toHaveBeenCalled();

        // api success with status code 200
        expect(res.status).toHaveBeenCalledWith(inviteUser.res.code);

        // successfully user got invited
        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(inviteUser.res.data);
    })

    test('test failed to invite user', async () => {
        const { inviteUser } = dummyData;

        // Mocking the rejection of invite creation
        db.invites.create.mockRejectedValue(new Error('Failed to create invite'));

        // Invoking the invite function from userController with mocked data
        await userController.invite({ body: { email: inviteUser.body.email }, user: inviteUser.body.user }, res);

        // Asserting that the appropriate status is set
        expect(res.status).toHaveBeenCalledWith(inviteUser.error.code);

        // Extracting data sent in the response and asserting its structure
        const data = res.send.mock.calls[0][0];
        expect(data).toHaveProperty('message');
    })

    // list invites
    // error
    test('test list invites success', async () => {
        const { listInvites } = dummyData;
        db.invites.findAndCountAll.mockResolvedValue(listInvites.res.data)

        await userController.listInvites(listInvites.req, res);

        expect(res.status).toHaveBeenCalledWith(listInvites.res.status);
        expect(db.invites.findAndCountAll).toHaveBeenCalled();

        const data = res.send.mock.calls[0][0];
        expect(data).toEqual(listInvites.res.data);
    })

    test('test error for list invites', async () => {
        const { listInvites } = dummyData;
        db.invites.findAndCountAll.mockRejectedValue(new Error('Failed to fetch invites'))

        await userController.listInvites(listInvites.req, res);

        expect(res.status).toHaveBeenCalledWith(listInvites.error.status);
        expect(db.invites.findAndCountAll).toHaveBeenCalled();

        const data = res.send.mock.calls[0][0];
        expect(data.message).toEqual(listInvites.error.message);
    })

    // remove invites
    test('test invited user not found', async () => {
        const { removeInvites } = dummyData;

        db.invites.findAndCountAll.mockResolvedValue(removeInvites.db.findAndCountAll.empty);
        db.invites.destroy.mockResolvedValue(removeInvites.db.destory.success);

        await userController.removeInvite(removeInvites.req, res);

        expect(res.status).toHaveBeenCalledWith(removeInvites.error.error_invite_user.status);
        expect(db.invites.findAndCountAll).toHaveBeenCalled();
        expect(db.invites.destroy).toHaveBeenCalled();

        const data = res.send.mock.calls[0][0];
        expect(data.message).toEqual(removeInvites.error.error_invite_user.message);
    })

    test('test invited user is active', async () => {
        const { removeInvites } = dummyData;

        db.invites.findAndCountAll.mockResolvedValue(removeInvites.db.findAndCountAll.accepted);

        await userController.removeInvite(removeInvites.req, res);

        expect(res.status).toHaveBeenCalledWith(removeInvites.error.error_active_invite.status);
        expect(db.invites.findAndCountAll).toHaveBeenCalled();

        const data = res.send.mock.calls[0][0];
        expect(data.message).toEqual(removeInvites.error.error_active_invite.message);
    })

    test('test invited user deleted successfully',async () => {
        const { removeInvites } = dummyData;

        db.invites.findAndCountAll.mockResolvedValue(removeInvites.db.findAndCountAll.success);
        db.invites.destroy.mockResolvedValue(removeInvites.db.destory.success);

        await userController.removeInvite(removeInvites.req, res);

        expect(res.status).toHaveBeenCalledWith(removeInvites.res.success.status);

        expect(db.invites.findAndCountAll).toHaveBeenCalled();
        expect(db.invites.destroy).toHaveBeenCalled();

        const data = res.send.mock.calls[0][0];
        expect(data.message).toEqual(removeInvites.res.success.message);
    })

    test('test remove invite error', async () => {
        const { removeInvites } = dummyData;

        db.invites.findAndCountAll.mockResolvedValue(removeInvites.db.findAndCountAll.success);
        db.invites.destroy.mockRejectedValue(new Error(removeInvites.error.error_internal_server.message));
        
        await userController.removeInvite(removeInvites.req, res);

        expect(res.status).toHaveBeenCalledWith(removeInvites.error.error_internal_server.status);

        expect(db.invites.findAndCountAll).toHaveBeenCalled();
        expect(db.invites.destroy).toHaveBeenCalled();

        const data = res.send.mock.calls[0][0];
        expect(data.message).toEqual(removeInvites.error.error_internal_server.message);
    })
});
