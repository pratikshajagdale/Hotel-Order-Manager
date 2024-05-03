import { toast } from "react-toastify";
import { PAGE_STATE } from "../../libs/constants";
import UserServices from "../../services/UserServices";
import store from "../../store/store";
import { componentKey, setLoadingState } from "./VerifyUserSlice";
import { all, put, takeLatest } from 'redux-saga/effects'


export const { verify } = {
    verify: (payload) => {
        return {
            type: "USER/VERIFY",
            payload,
        };
    },
};

function* verifyUserAsync(action) {
    const { payload, navigate } = action.payload;
    try {
        yield put(setLoadingState({ state: PAGE_STATE.LOADING, message: "Loading" }));
        const res = yield UserServices.verify(payload);
        if (res?.status) {
            localStorage.setItem('token', res.token);
            toast.success('Verified successfully');
            navigate('/dashboard');
        }
    } catch (error) {
        console.log("err: ", error);
    }
}

function* rootSaga() {
    yield all([takeLatest(verify().type, verifyUserAsync)]);
}

store.sagaManager.addSaga(componentKey, rootSaga);
