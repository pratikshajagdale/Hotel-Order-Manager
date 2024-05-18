import { createSlice } from '@reduxjs/toolkit';

const managerSlice = createSlice({
    name: 'MANAGER',
    reducers: {
        setUpdateManagerModal: (state) => {
            state.updateManagerModal = !state.updateManagerModal;
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload;
        },
        setIsRemoveManager: (state) => {
            state.isRemoveManager = !state.isRemoveManager;
        },
        getManagers() {},
        getManagerSuccess(state, action) {
            state.data = action.payload;
        }
    },
    initialState: {
        updateManagerModal: false,
        selectedRow: {},
        isRemoveManager: false,
        data: {}
    }
});

export const { setUpdateManagerModal, setSelectedRow, setIsRemoveManager, getManagers, getManagerSuccess } =
    managerSlice.actions;

export const managerReducer = managerSlice.reducer;
