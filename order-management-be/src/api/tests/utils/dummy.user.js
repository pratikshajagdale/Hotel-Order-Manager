import moment from "moment";
import { USER_STATUS } from "../../models/user.model.js";
import { STATUS_CODE } from "../../utils/common.js";
import { INVITE_STATUS } from "../../models/invite.model.js";

const invalidEmailData = {
    body: {
        firstName: 'test',
        lastName: 'test',
        phoneNumber: 1234567890,
        email: 'test$test.vi', // invalid email
        password: 'U2FsdGVkX1/M/nm/UED5QUvoaIEZMa5p9y7ePJ0r8ik=',
    },
    res: {
        code: STATUS_CODE.BAD_REQUEST,
        data: { message: `"email" must be a valid email` }
    }
};

const invalidPasswordData = {
    body: {
        firstName: 'test',
        lastName: 'test',
        phoneNumber: 1234567890,
        email: 'test@test.com',
        password: 'U2FsdGVkX1+hsiMAdRRWOn8GAzrrRJSF/R4DTrRUxiM=', // inavlid password Test1234
    },
    res: {
        code: STATUS_CODE.BAD_REQUEST,
        data: { message: '"password" with value "Test1234" fails to match the required pattern' }
    }
};

const invalidPhoneData = {
    body: {
        firstName: 'test',
        lastName: 'test',
        phoneNumber: 123456789, // invalid phone with 9 digits 
        email: 'test@test.com',
        password: 'U2FsdGVkX1/M/nm/UED5QUvoaIEZMa5p9y7ePJ0r8ik=',
    },
    res: {
        code: STATUS_CODE.BAD_REQUEST,
        data: { message: '"phoneNumber" must be greater than or equal to 1000000000' }
    }
};

const invalidData = {
    body: {
        phoneNumber: 1234567890,
        email: 'test@test.com',
        password: 'U2FsdGVkX1/M/nm/UED5QUvoaIEZMa5p9y7ePJ0r8ik=',
    },
    res: {
        code: STATUS_CODE.BAD_REQUEST,
        data: { message: '"firstName" is required' }
    }
};

const user = {
    body: {
        firstName: 'test',
        lastName: 'test',
        phoneNumber: 1234567890,
        email: 'test@test.com',
        password: 'U2FsdGVkX1/M/nm/UED5QUvoaIEZMa5p9y7ePJ0r8ik=',
    },
    db: {
        id: '60c688d6-5442-4569-9c8c-3f973b3ba554',
        firstName: 'test',
        lastName: 'test',
        phoneNumber: 1234567890,
        email: 'test@test.com',
        role: 'OWNER',
        status: 'INACTIVE'
    },
    res: {
        code: STATUS_CODE.CREATED,
    }
};

const unregisteredEmailData = {
    body: {
        email: 'unregistered-email@test.com',
        password: 'U2FsdGVkX1/M/nm/UED5QUvoaIEZMa5p9y7ePJ0r8ik=' // Test@1234
    },
    res: {
        code: STATUS_CODE.NOT_FOUND,
        data: { message: 'Email not registered' }
    }
}

const incorrectPasswordData = {
    body: {
        email: 'valid-email@test.com',
        password: 'U2FsdGVkX1/M/nm/UED5QUvoaIEZMa5p9y7ePJ0r8ik=' // Test@1234
    },
    db: {
        email: 'valid-email@test.com',
        password: 'U2FsdGVkX1/AELUGLFLq8XnS9DAMLT0WCO36dja0CpA=' // Test@1237
    },
    res: {
        code: STATUS_CODE.UNAUTHORIZED,
        data: { message: 'Invalid password' }
    }
}

const inActiveData = {
    body: {
        email: 'valid-email@test.com',
        password: 'U2FsdGVkX1/M/nm/UED5QUvoaIEZMa5p9y7ePJ0r8ik=' // Test@1234
    },
    db: {
        email: 'valid-email@test.com',
        password: 'U2FsdGVkX1/M/nm/UED5QUvoaIEZMa5p9y7ePJ0r8ik=', // Test@1234
        status: USER_STATUS[1]
    },
    res: {
        code: STATUS_CODE.FORBIDDEN,
        data: { message: 'Email not verified' }
    }
}

const successLoginData = {
    body: {
        email: 'valid-email@test.com',
        password: 'U2FsdGVkX1/M/nm/UED5QUvoaIEZMa5p9y7ePJ0r8ik=' // Test@1234
    },
    db: {
        email: 'valid-email@test.com',
        password: 'U2FsdGVkX1/M/nm/UED5QUvoaIEZMa5p9y7ePJ0r8ik=', // Test@1234
        status: USER_STATUS[0]
    },
    res: {
        code: STATUS_CODE.OK,
        data: { message: 'Email not verified' }
    }
}

const userAlreadyVerifiedData = {
    body: {
        email: 'valid-test@test.com',
    },
    db: {
        status: USER_STATUS[0]
    },
    res: {
        code: STATUS_CODE.BAD_REQUEST,
        data: { message: 'User already verified Please try login' }
    }
}

const linkExpiredData = {
    body: {
        email: 'valid-test@test.com',
        expires: moment().subtract(1, 'hour').valueOf()
    },
    db: {
        status: USER_STATUS[1]
    },
    res: {
        code: STATUS_CODE.GONE,
        data: { message: `Sorry, the link has expired. We've sent a new one to your email. Please check and try again.` }
    }
}

const verifyEmailData = {
    body: {
        email: 'valid-test@test.com',
        expires: moment().add(1, 'hour').valueOf()
    },
    db: {
        status: USER_STATUS[1]
    },
    res: {
        code: STATUS_CODE.OK,
        data: { status: USER_STATUS[0] }
    }
}

const unverifiedData = {
    body: {
        email: 'valid-email@test.com'
    },
    db: {
        status: USER_STATUS[1]
    },
    res: {
        code: STATUS_CODE.FORBIDDEN,
        data: { message: 'User has not verified email' }
    }
}

const forgotPasswordData = {
    body: {
        email: 'valid-email@test.com'
    },
    db: {
        status: USER_STATUS[0]
    },
    res: {
        code: STATUS_CODE.OK,
        data: { message: 'Recover password link sent. Please check your email.' }
    }
}

const resetPasswordData = {
    body: {
        email: 'valid-email@test.com',
        newPassword: 'U2FsdGVkX1/AELUGLFLq8XnS9DAMLT0WCO36dja0CpA=', // Test@1237
        expires: moment().add(1, 'hour').valueOf()
    },
    db: {
        password: ''
    },
    res: {
        code: STATUS_CODE.OK,
        data: { message: 'Password reset successfully' }
    }
}

const inviteUser = {
    body: {
        email: 'valid-test@test.com',
        user: {
            id: 'test-owner-id',
            firstName: 'test-owner-firstname',
            lastName: 'test-owner-lastname'
        }
    },
    db: {
        id: 'test-invite-id'
    },
    res: {
        code: STATUS_CODE.OK,
        data: { message: 'Invite link sent' }
    },
    error: {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR
    }
}


const listInvites = {
    req: { query: {}, user: { id: 'test-user-id' } },
    res: {
        status: STATUS_CODE.OK,
        data: {
            count: 1,
            data: [{
                id: 'test-invite-id'
            }]
        }
    },
    error: {
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch invites'
    }
}

const removeInvites = {
    req: { body: { id: 'test-invite-id' } },
    res: {
        success: {
            status: STATUS_CODE.OK,
            message: 'Invite deleted successfully'
        }
    },
    error: {
        error_invite_user: {
            status: STATUS_CODE.NOT_FOUND,
            message: 'Invited user not found'
        },
        error_active_invite: {
            status: STATUS_CODE.BAD_REQUEST,
            message: 'Invited user is active'
        },
        error_internal_server: {
            status: STATUS_CODE.INTERNAL_SERVER_ERROR,
            message: 'Failed to remove invite'
        }
    },
    db: {
        findAndCountAll: {
            empty: {
                rows: []
            },
            accepted: {
                rows: [{ status: INVITE_STATUS[1] }]
            },
            success: {
                rows: [{ status: INVITE_STATUS[0] }]
            }
        },
        destory: {
            success: 1,
        }
    }
}

export default {
    invalidEmailData,
    invalidPasswordData,
    invalidPhoneData,
    invalidData,
    user,
    unregisteredEmailData,
    incorrectPasswordData,
    inActiveData,
    successLoginData,
    userAlreadyVerifiedData,
    linkExpiredData,
    verifyEmailData,
    unverifiedData,
    forgotPasswordData,
    resetPasswordData,
    inviteUser,
    listInvites,
    removeInvites
}