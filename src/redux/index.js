import { combineReducers } from 'redux';

import fetchPhotosReducer from './fetchPhotos';
import fetchCommentsReducer from './fetchComments';
import postCommentReducer from './postComment';

const reducer = combineReducers({
    fetchPhotos: fetchPhotosReducer,
    fetchComments: fetchCommentsReducer,
    postComment: postCommentReducer
});

export default reducer;
