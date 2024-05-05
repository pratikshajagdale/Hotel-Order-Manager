import { toast } from "react-toastify";
import { PAGE_STATE } from "../../libs/constants";
import store from "../../store/store";
import { all, put, takeLatest } from "redux-saga/effects";
import InviteServices from "../../services/InviteServices";
import { componentKey, setChange, setInviteData, setLoadingState } from "./InviteSlice";

export const { inviteUser, list, remove } = {
    inviteUser: (payload) => {
        return {
            type: "INVITE/USER",
            payload,
        };
    },
    list: (payload) => {
        return {
            type: "INVITE/LIST",
            payload,
        };
    },
    remove: (payload) => {
        return {
            type: "INVITE/REMOVE",
            payload,
        };
    },
};

function* inviteUserAsync(action) {
    const { email } = action.payload;
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Loading" }));
        const res = yield InviteServices.inviteUser(email);
        if (res?.status) {
            toast.success("User invited successfully");
            yield put(setChange());
        }
    } catch (error) {
        toast.error(`Failed to invite user: ${error.message}`);
    }
}
function* listAsync(action) {
    const { params } = action.payload;
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Loading" }));
        const res = yield InviteServices.list(params);
        if (res?.status) {
            yield put(setInviteData(res));
        }
    } catch (error) {
        toast.error(`Failed to fetch list: ${error.message}`);
    }
}
function* removeAsync(action) {
    const { payload } = action.payload;
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Loading" }));
        const res = yield InviteServices.remove(payload);
        if (res?.status) {
            yield put(setChange());
            toast.success("Invite record deleted successfully");
        }
    } catch (error) {
        toast.error(`Failed to delete invite record: ${error.message}`);
    }
}

function* rootSaga() {
    yield all([takeLatest(inviteUser().type, inviteUserAsync), takeLatest(list().type, listAsync), takeLatest(remove().type, removeAsync)]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
