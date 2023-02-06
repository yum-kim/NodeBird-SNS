import { all, fork } from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';

export default function* rootSaga() {
    yield all([
        fork(postSaga),
        fork(userSaga)
    ]);

    /**
     * all: 배열을 받아 동시에 실행하게함
     * fork: 함수를 실행 (call과 비슷하지만 다름)
     */
}


