import { all, fork } from 'redux-saga/effects';
import authSaga from './auth.saga';
import inviteSaga from './invite.saga';

const rootSaga = function* () {
    yield all([fork(authSaga), fork(inviteSaga)]);
};

export default rootSaga;
