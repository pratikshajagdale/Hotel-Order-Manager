import { api, method } from "../api/apiClient";

export default class UserServices {
    static async registerUser(payload) {
        return await api(method.POST, "/user/register", payload);
    }
    static async login(payload) {
        return await api(method.POST, "/user/login", payload);
    }
    static async verify(payload) {
        return await api(method.POST, "/user/verify", payload);
    }
    static async forgotPassword(payload) {
        return await api(method.POST, "/user/forget", payload);
    }
    static async resetPassword(payload) {
        return await api(method.POST, "/user/reset", payload);
    }
}
