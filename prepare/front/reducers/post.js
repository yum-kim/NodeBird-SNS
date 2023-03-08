import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';

export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '유미',
        },
        content: '첫 번째 게시글입니당 #해시태그 ##첫번째 #두번째',
        Images: [{
            id: shortId.generate(),
            src: 'https://asset.programmers.co.kr/image/origin/production/job_theme/163050/4412d7cf-6486-4e3c-9308-c0982b3227d1.jpg'
        }, {
            id: shortId.generate(),
            src:  'https://cdn-bastani.stunning.kr/prod/portfolios/285fae5b-910d-4e22-9885-58ff63ff8466/contents/B4PDg3poA9ZEcePi.%EB%85%B8%ED%8F%B4%20%EC%BB%A4%EB%B2%84%EC%9A%A9.gif'
        }],
        Comments: [{
            User: {
                id: shortId.generate(),
                nickname: 'hyun',
            },
            content: '축하합니다!'
        }, {
            User: {
                id: shortId.generate(),
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
    addCommentError: null,
    deletePostLoading: false,
    deletePostDone: false,
    deletePostError: null,
}

initialState.mainPosts = initialState.mainPosts.concat(
    Array(20).fill().map((v, i) => ({
        id: shortId.generate(),
        User: {
            id: shortId.generate(),
            nickname: faker.name.findName()
        },
        content: faker.lorem.paragraph(),
        Images: [],
        Comments: [{
            User: {
                id: shortId.generate(),
                nickname: faker.name.findName()
            },
            content: faker.lorem.sentence()
        }],
    }))
);

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

export const deletePost = (data) => ({
    type: DELETE_POST_REQUEST,
    data,
});

const dummyPost = (data) => ({
    id: data.id,
    User: {
        id: 1,
        nickname: '유미',
    },
    content: data.content,
    Images: [],
    Comments: []
});

const dummyComment = (data) => ({
    id: shortId.generate(),
    User: {
        nickname: '유미',
    },
    content: data,
});

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_POST_REQUEST: 
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS: 
                draft.mainPosts.unshift(dummyPost(action.data));
                draft.addPostLoading = false;
                draft.addPostDone = true;
                break;
            case ADD_POST_FAILURE: 
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:
                const post = draft.mainPosts.find((v) => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            case DELETE_POST_REQUEST:
                draft.deletePostLoading = true;
                draft.deletePostDone = false;
                draft.deletePostError = null;
                break;
            case DELETE_POST_SUCCESS:
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.postId);
                draft.deletePostLoading = false;
                draft.deletePostDone = true;
                break;
            case DELETE_POST_FAILURE:
                draft.deletePostLoading = false;
                draft.deletePostError = action.error;
                break;
            default:
                return state;
        }
    })
};

export default reducer;