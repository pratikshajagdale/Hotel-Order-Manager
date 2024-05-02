import store from "../../store/store";

export const componentKey = "HOTEL_SLICE";

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setDemoState: (state, action) => {
            state.demoState = action.payload;
        },
    },
    initialReducerState: {
        demoState: "Hello",
    },
});

export const {setDemoState} = actions;
