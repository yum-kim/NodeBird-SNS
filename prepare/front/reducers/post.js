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
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_POST_FAILURE';

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

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
        case ADD_POST_REQUEST: {
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null
            }
        }
        case ADD_POST_SUCCESS: 
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                addPostLoading: false,
                addPostDone: true,
            };
        case ADD_POST_FAILURE: {
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            }
        };
        case ADD_COMMENT_REQUEST: {
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null
            }
        }
        case ADD_COMMENT_SUCCESS: 
            return {
                ...state,
                addCommentLoading: false,
                addCommentDone: true,
            };
        case ADD_COMMENT_FAILURE: {
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.error,
            }
        };
        default:
            return state;
    }
};

export default reducer;