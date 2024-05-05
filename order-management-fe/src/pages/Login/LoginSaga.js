import { toast } from "react-toastify";
import { PAGE_STATE } from "../../libs/constants";
import UserServices from "../../services/UserServices";
import store from "../../store/store";
import { componentKey, setLoadingState } from "./LoginSlice";
import { all, put, takeLatest } from "redux-saga/effects";

export const { login } = {
    login: (payload) => {
        return {
            type: "USER/LOGIN",
            payload,
        };
    },
};

function* loginUserAsync(action) {
    const { payload, navigate } = action.payload;
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Loading" }));
        const res = yield UserServices.login(payload);
            localStorage.setItem("token", res.token);
            toast.success("Login successfully");
            navigate("/dashboard");
    } catch (error) {
        console.log("err: ", error);
    }
}

function* rootSaga() {
    yield all([takeLatest(login().type, loginUserAsync)]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
