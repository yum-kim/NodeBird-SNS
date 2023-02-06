import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';

function logInAPI(data) {
    //주의) 이 함수는 Generator 아님! * 붙이지 말 것
    return axios.post('/api/login', data);
}

function* logIn(action) {
    //성공결과는 result.data, 실패결과는 err.response.data에 담겨있음

    try {
        // const result = yield call(logInAPI, action.data);
        yield delay(2000); //login 서버 구현 전까지 임시 구현

        yield put({
            type: 'LOG_IN_SUCCESS',
            data: result.data
        })
    } catch (err) {
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data
        })
    }

    /**
     * put: dispatch(action을)
     * call vs fork: call은 동기함수 호출, fork는 비동기함수 호출
     * -> call을 하면 logInAPI 결과값 기다렸다가 넘어가는데, fork는 안기다리고 넘어감
     */
}

//thunk에서는 비동기 action creator를 직접 실행했으나, saga에서는 이벤트 리스너 같은 역할을 함
function* watchLogIn() {
    yield takeLatest('LOG_IN_REQUEST', logIn);
    //LOG_IN 이라는 action이 실행될 때까지 기다리겠다, 실행되면 logIn 함수를 실행
    //while로 감싸주어야 무한으로 이벤트 리스너 동작, 원래 한번만 받고 일회성으로 
}

function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST');    
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
    ])
}