export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '유미',
        },
        content: '첫 번째 게시글입니당 #해시태그 ##첫번째 #두번째',
        Images: [{
            src: 'https://asset.programmers.co.kr/image/origin/production/job_theme/163050/4412d7cf-6486-4e3c-9308-c0982b3227d1.jpg'
        }, {
            src:  'https://cdn-bastani.stunning.kr/prod/portfolios/285fae5b-910d-4e22-9885-58ff63ff8466/contents/B4PDg3poA9ZEcePi.%EB%85%B8%ED%8F%B4%20%EC%BB%A4%EB%B2%84%EC%9A%A9.gif'
        }],
        Comments: [{
            User: {
                nickname: 'hyun',
            },
            content: '축하합니다!'
        }, {
            User: {
                nickname: 'min',
            },
            content: '축하해요~~'
        }]
    }],
    imagePaths: [],
    postAdded: false,
}

const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST
}

const dummyPost = {
    id: 2,
    User: {
        id: 1,
        nickname: '유미',
    },
    content: '데이터 추가 테스트 더미 데이터!'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: return {
            ...state,
            mainPosts: [dummyPost, ...state.mainPosts],
            postAdded: true
        };
        default:
            return state;
    }
};

export default reducer;