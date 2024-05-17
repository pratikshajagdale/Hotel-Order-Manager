import { authReducer, managerReducer } from '../slice';
import { inviteSlice } from '../slice/invite.slice';
import { loaderSlice } from '../slice/loader.slice';

const rootReducers = {
    loader: loaderSlice.reducer,
    users: authReducer,
    invite: inviteSlice?.reducer,
    manager: managerReducer
};

export default rootReducers;
