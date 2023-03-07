import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE
} from '../../reducers/post';

function addPostAPI(data) {
    return axios.post('api/post/add', data);
}

function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);

        yield put({
            type: ADD_POST_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data
        })
    }

}

function addCommentAPI(data) {
    return axios.post(`api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
    try {
        yield delay(1000);

        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data
        })
    }
}

function* deletePost(action) {
    try {
        // const result = yield call(deletePostAPI, action.data);
        yield delay(1000);

        yield put({
            type: DELETE_POST_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: DELETE_POST_FAILURE,
            data: err.response.data
        })
    }

}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchdeletePost() {
    yield takeLatest(DELETE_POST_REQUEST, deletePost);
}
 
 
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchdeletePost),
    ])
}