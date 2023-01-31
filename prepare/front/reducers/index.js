import { HYDRATE } from 'next-redux-wrapper';
import user from './user';
import post from './post';
import { combineReducers } from 'redux';

/** reducer
 *  현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수 (이전상태, 액션) => 다음상태
 *  -> 초기 state가 있고, action을 받아서 다음 state가 만들어짐
 * initialState랑은 객체가 다름 (그래야 prev, next state 둘 다 기록에 남음)
 */

//combineReducers -> 여러 reducer를 사용할 경우 reducer를 하나로 묶어주는 메소드 (store에 저장되는 reducer는 1개)
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