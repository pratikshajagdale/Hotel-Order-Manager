import { PAGE_STATE } from "../../libs/constants";
import store from "../../store/store";

export const componentKey = "INVITE_USER";

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload;
        },
        setChange: (state) => {
            state.change = !state.change;
        },
        setInviteData: (state, action) => {
            state.inviteData = action.payload;
        },
    },
    initialReducerState: {
        loadingState: { state: PAGE_STATE.LOADING, message: "" },
        change: false,
        inviteData: { count: 0, rows: [] },
    },
});

export const { setLoadingState, setChange,setInviteData } = actions;
