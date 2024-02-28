import { api, method } from "../api/apiClient"

export const registerOwner = async ( payload ) => {
    try {
        return await api(method.POST, '/owner', payload);
    } catch (error) {
        console.error(`Error to register user ${error}`);
        throw error;
    }
}
