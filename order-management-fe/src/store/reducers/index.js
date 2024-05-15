import authSlice from './auth.slice';
import { inviteSlice } from './invite.slice';
import { loaderSlice } from './loader.slice';

const rootReducers = {
    loader: loaderSlice.reducer,
    users: authSlice?.reducer,
    invite: inviteSlice?.reducer
};

export default rootReducers;
