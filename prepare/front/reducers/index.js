import { HYDRATE } from 'next-redux-wrapper';
import user from './user';
import post from './post';
import { combineReducers } from 'redux';

/** reducer
 *  현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수 (이전상태, 액션) => 다음상태
 *  -> 초기 state가 있고, action을 받아서 다음 state가 만들어짐
 * initialState랑은 객체가 다름 (그래야 prev, next state 둘 다 기록에 남음)
 */
const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            case HYDRATE: {
                console.log('HYDRATE', action);
                return { ...state, ...action.payload };
            }
            default:
                return state;
        }
    },
    user,
    post
});

export default rootReducer;