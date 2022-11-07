const initialState = {
    user: {
        inLoggedIn: false,
        user: null,
        signUpData: {},
        loginData: {},
    },
    post: {
        mainPosts: [],
    }
};

//action creater
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

//(이전상태, 액션) => 다음상태
// -> 초기 state가 있고, action을 받아서 다음 state가 만들어짐
//initialState랑은 객체가 다름 (그래야 prev, next state 둘 다 기록에 남음)
const rootReducer = ((state = initialState, action) => {
    switch(action.type) {
        case 'LOG_IN': {
            return {
                ...state,
                user: {
                    ...state.user, //안 바꾸고 싶은 데이터 -> spread로 그대로 참조
                    isLoggedIn: true, //바꾸고 싶은 데이터 -> 새로 넣어줌
                    user: action.data
                }
            }
        };
      
        case 'LOG_IN': {
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: false,
                    user: null
                }
            }
        };
    }
});

export default rootReducer;