import { api, method } from '../api/apiClient'

export const registerOwner = async ( payload ) => {
    try {
        return await api(method.POST, '/owner/register', payload);
    } catch (error) {
        console.error(`Error to register user ${error}`);
        throw error;
    }
}

export const login = async ( payload ) => {
    try {
        return await api(method.POST, '/owner/login', payload);
    } catch (error) {
        console.error(`Error to login user ${error}`);
        throw error;
    }
}

export const verify = async ( payload ) => {
    try {
        return await api(method.POST, '/owner/verify', payload);
    } catch (error) {
        console.error(`Error to login user ${error}`);
        throw error;
    }
}

export const forgotPassword = async ( payload ) => {
    try {
        return await api(method.POST, '/owner/forget', payload);
    } catch (error) {
        console.error(`Error to login user ${error}`);
        throw error;
    }
}

export const resetPassword = async ( payload ) => {
    try {
        return await api(method.POST, '/owner/reset', payload);
    } catch (error) {
        console.error(`Error to login user ${error}`);
        throw error;
    }
}
