import userController from "../../controllers/user.controllers";
import { db } from "../../../config/database";
import dummyData from "../utils/dummy.invite";

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

// invite user
describe('test invite cases', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    })

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

    test('test invited user deleted successfully', async () => {
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
})
