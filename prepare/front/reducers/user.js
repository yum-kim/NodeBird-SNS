//store
export const initialState = {
    isLoggingIn: false, //로그인 시도중
    isLoggedIn: false,
    isLoggingOut: false, //로그아웃 시도중
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

/**
 * action
 * 원칙적으로 Login에는 request-success-failure 3단계가 있음
 */
export const loginRequestAction = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
};

export const logoutRequestAction = (data) => {
    return {
        type: 'LOG_OUT_REQUEST',
        data,
    }
};

//reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN_REQUEST': {
            console.log('reducer - LOG_IN_REQUEST');

            return {
                ...state,
                isLoggingIn: true
            }
        };
        case 'LOG_IN_SUCCESS': {
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                me: { ...action.data, nickname: 'yum' }
            }
        };
        case 'LOG_IN_FAILURE': {
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: false,
            }
        }; 
        case 'LOG_OUT_REQUEST': {
            return {
                ...state,
                isLoggingOut: true
            }
        };
        case 'LOG_OUT_SUCCESS': {
            return {
                ...state,
                isLoggingOut: false,
                isLoggedIn: false,
                me: null
            }
        };            
        case 'LOG_OUT_FAILURE': {
            return {
                ...state,
                isLoggingOut: false,
            }
        };
        default:
            return state;
    }
};

export default reducer;