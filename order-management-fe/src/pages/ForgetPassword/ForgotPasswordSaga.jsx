import { toast } from "react-toastify";
import { PAGE_STATE } from "../../libs/constants";
import UserServices from "../../services/UserServices";
import store from "../../store/store";
import { componentKey, setLoadingState } from "./ForgotPasswordSlice";
import { all, put, takeLatest } from 'redux-saga/effects'

export const { forgotPassword } = {
    forgotPassword: (payload) => {
        return {
            type: "USER/FORGOT_PASSWORD",
            payload,
        };
    },
};

function* forgotPasswordAsync(action) {
    const { values, navigate } = action.payload;
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Loading" }));
        const res = yield UserServices.forgotPassword(values);
        if (res.status) {
            toast.success("Reset password email sent successfully");
            navigate("/");
        }
    } catch (error) {
        console.log("err: ", error);
    }
}

function* rootSaga() {
    yield all([takeLatest(forgotPassword().type, forgotPasswordAsync)]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
