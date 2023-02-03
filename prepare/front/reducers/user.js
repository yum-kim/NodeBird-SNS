//store
export const initialState = {
    isLoggedIn: false,
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

export const loginSuccessAction = (data) => {
    return {
        type: 'LOG_IN_SUCCESS',
        data,
    }
};

export const loginRequestFailure = (data) => {
    return {
        type: 'LOG_IN_FAILURE',
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
        case 'LOG_OUT_REQUEST': {

        };
        case 'LOG_IN_SUCCESS': {
            return {
                ...state, //안 바꾸고 싶은 데이터 -> spread로 그대로 참조
                isLoggedIn: true, //바꾸고 싶은 데이터 -> 새로 넣어줌
                user: action.data
            }
        };
        case 'LOG_IN_FAILURE': {

        }; 
        case 'LOG_OUT_REQUEST': {
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        };
        default:
            return state;
    }
};

export default reducer;