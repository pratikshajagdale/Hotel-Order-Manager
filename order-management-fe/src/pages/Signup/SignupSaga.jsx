import { toast } from "react-toastify";
import { PAGE_STATE } from "../../libs/constants";
import UserServices from "../../services/UserServices";
import store from "../../store/store";
import { componentKey, setLoadingState } from "./SignupSlice";
import { all, put, takeLatest } from "redux-saga/effects";

export const { registerUser } = {
    registerUser: (payload) => {
        return {
            type: "USER/REGISTRATION",
            payload,
        };
    },
};

function* registerUserAsync(action) {
    const { payload, navigate } = action.payload;
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Loading" }));
        const res = yield UserServices.registerUser(payload);
        if (res?.status) {
            toast.success("User registered successfully. Please verify your email");
            navigate("/");
        }
    } catch (error) {
        console.log("err: ", error);
    }
}

function* rootSaga() {
    yield all([takeLatest(registerUser().type, registerUserAsync)]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
