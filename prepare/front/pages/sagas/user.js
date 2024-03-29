import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
    UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE, UNFOLLOW_REQUEST
} from '../../reducers/user';

function logInAPI(data) {
    //주의) 이 함수는 Generator 아님! * 붙이지 말 것
    return axios.post('/api/login', data);
}

function* logIn(action) {
    //성공결과는 result.data, 실패결과는 err.response.data에 담겨있음

    try {
        console.log('saga - LOG_IN_REQUEST');

        // const result = yield call(logInAPI, action.data);
        yield delay(1000); //login 서버 구현 전까지 임시 구현

        yield put({
            type: LOG_IN_SUCCESS,
            // data: result.data
            data: action.data //login 서버 구현 전까지 임시 구현
        })
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            data: err.response.data
        })
    }

    /**
     * put: dispatch(action을)
     * call vs fork: call은 동기함수 호출, fork는 비동기함수 호출
     * -> call을 하면 logInAPI 결과값 기다렸다가 넘어가는데, fork는 안기다리고 넘어감
     */
}

function* logOut(action) {
    try {
        yield delay(500);
        
        yield put({
            type: LOG_OUT_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            data: err.response.data
        })
    }
}

function* signUp(action) {
    try {
        yield delay(1000);
        
        yield put({
            type: SIGN_UP_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            data: err.response.data
        })
    }
}

function followAPI(data) {
    return axios.post('/api/follow', data);
}

function* follow(action) {
    try {
        // const result = yield call(followAPI, action.data);

        yield delay(1000);
        
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: FOLLOW_FAILURE,
            data: err.response.data
        })
    }
}

function unfollowAPI(data) {
    return axios.post('/api/unfollow', data);
}

function* unfollow(action) {
    try {
        // const result = yield call(unfollowAPI, action.data);
        yield delay(1000);
        
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            data: err.response.data
        })
    }
}

//thunk에서는 비동기 action creator를 직접 실행했으나, saga에서는 이벤트 리스너 같은 역할을 함
function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
    //LOG_IN 이라는 action이 실행될 때까지 기다리겠다, 실행되면 logIn 함수를 실행
    //while로 감싸주어야 무한으로 이벤트 리스너 동작, 원래 한번만 받고 일회성으로 끝나나, takeEvery나 takeLatest로 while 대체 가능
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}


export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
    ])
}