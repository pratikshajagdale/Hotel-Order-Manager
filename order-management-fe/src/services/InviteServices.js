import { api, method } from "../api/apiClient";

export default class InviteServices {
    static async inviteUser(payload) {
        return await api(method.POST, "/user/invite", payload);
    }
    static async list(params) {
        const query = `skip=${params?.skip}&limit=${params?.limit}&sort_key=${params?.sort_key}&sort_order=${params?.sort_order}&filter_key=${params?.filter_key}&filter_value=${params?.filter_value}`;
        return await api(method.GET, `/user/invite?${query}`);
    }
    static async remove(payload) {
        return await api(method.DELETE, `/user/invite`, payload);
    }
}
