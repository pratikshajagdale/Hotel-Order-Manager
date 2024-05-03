import { PAGE_STATE } from "../../libs/constants";
import UserServices from "../../services/UserServices";
import store from "../../store/store";
import { componentKey, setLoadingState } from "./ResetPasswordSlice";
import { all, put, takeLatest } from 'redux-saga/effects'


export const { resetPassword } = {
    resetPassword: (payload) => {
        return {
            type: "USER/RESET_PASSWORD",
            payload,
        };
    },
};

function* resetPasswordAsync(action) {
    const { payload, navigate } = action.payload;
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Loading" }));
        const res = yield UserServices.resetPassword(payload);
        if (res?.status) {
            toast.success("Password reset successfully");
            navigate("/");
        }
    } catch (error) {
        console.log("err: ", error);
    }
}

function* rootSaga() {
    yield all([takeLatest(resetPassword().type, resetPasswordAsync)]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
