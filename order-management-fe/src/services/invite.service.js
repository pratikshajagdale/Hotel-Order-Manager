import { api, method } from "../api/apiClient";

export const inviteUser = async ( payload ) => {
    try {
        return await api(method.POST, '/user/invite', payload);
    } catch (error) {
        console.error(`Error to invite user ${error}`);
        throw error;
    }
}

export const list = async ( query ) => {
    try {
        return await api(method.GET, `/user/invite?${query}`)
    } catch (error) {
        console.error(`Error to fetch invite list ${error}`);
        throw error;
    }
}
