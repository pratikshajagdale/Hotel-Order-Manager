import { PAGE_STATE } from "../../libs/constants"
import store from "../../store/store"

export const componentKey = 'SIGNUP'

const { actions } = store.reducerManager.add({
    key: componentKey,
    addedReducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload
        },
    },
    initialReducerState: {
        loadingState: { state: PAGE_STATE.LOADING, message: '' },
    }
})

export const { setLoadingState } = actions