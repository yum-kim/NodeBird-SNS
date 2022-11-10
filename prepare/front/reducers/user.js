//store
export const initialState = {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
}

//action
export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
};

export const logoutAction = (data) => {
    return {
        type: 'LOG_OUT',
        data,
    }
};

//reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN': {
            return {
                ...state, //안 바꾸고 싶은 데이터 -> spread로 그대로 참조
                isLoggedIn: true, //바꾸고 싶은 데이터 -> 새로 넣어줌
                user: action.data
            }
        };
        case 'LOG_OUT': {
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