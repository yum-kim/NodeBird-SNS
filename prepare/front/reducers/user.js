//store
export const initialState = {
    logInLoading: false,
    logInDone: false,
    logInError: null,
    logOutLoading: false,
    logOutDone: false,
    logOutError: null,
    signUpLoading: false, 
    signUpDone: false,
    signUpError: null,
    me: null,
    signUpData: {},
    loginData: {},
}

/* reudx-thunk를 쓸 경우 이렇게 사용 (saga사용으로 삭제)
* -> 비동기 action creator가 하나 추가됨
*/
// export const loginAction = (data) => {
//     return (dispatch) => {
//         dispatch(loginRequestAction());
//         axios.post('/api/login', data)
//             .then((res) => {
//                 dispatch(loginSuccessAction(res.data));
//             })
//             .catch((err) => {
//                 dispatch(loginRequestFailure(err));
//             })
//     }
// }

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

/**
 * action
 * 원칙적으로 Login에는 request-success-failure 3단계가 있음
 */
export const loginRequestAction = (data) => {
    return {
        type: LOG_IN_REQUEST,
        data,
    }
};

export const logoutRequestAction = (data) => {
    return {
        type: LOG_OUT_REQUEST,
        data,
    }
};

const dummyUser = (data) => ({
    ...data,
    nickname: 'yum',
    id: 1,
    Posts: [],
    Followers: [],
    Followings: []
});

//reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST: 
            console.log('reducer - LOG_IN_REQUEST');
            return {
                ...state,
                logInLoading: true,
                logInDone: false,
                logInError: null
            }
        case LOG_IN_SUCCESS: 
            return {
                ...state,
                logInLoading: false,
                logInDone: true,
                me: dummyUser(action.data)
            }
        case LOG_IN_FAILURE: 
            return {
                ...state,
                logInLoading: false,
                logInDone: false,
                logInError: action.error,
            }
        case LOG_OUT_REQUEST: 
            return {
                ...state,
                logOutLoading: true,
                logOutDone: false,
                logOutError: true 
            }
        case LOG_OUT_SUCCESS: 
            return {
                ...state,
                logOutLoading: false,
                logOutDone: true,
                me: null
            }
        case LOG_OUT_FAILURE: 
            return {
                ...state,
                logOutLoading: false,
                logOutDone: false,
                logOutError: action.error
            }
        case SIGN_UP_REQUEST: 
            return {
                ...state,
                signUpLoading: true,
                signUpDone: false,
                signUpError: true 
            }
        case SIGN_UP_SUCCESS: 
            return {
                ...state,
                signUpLoading: false,
                signUpDone: true,
            }
        case SIGN_UP_FAILURE: 
            return {
                ...state,
                signUpLoading: false,
                signUpDone: false,
                signUpError: action.error
            }
        default:
            return state;
    }
};

export default reducer;