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
        }
    },
    initialState: {
        updateManagerModal: false,
        selectedRow: {},
        isRemoveManager: false
    }
});

export const { setUpdateManagerModal, setSelectedRow, setIsRemoveManager } = managerSlice.actions;
export const managerReducer = managerSlice.reducer;
