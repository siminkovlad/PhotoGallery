import { call, put, takeEvery } from '@redux-saga/core/effects';

export const POST_COMMENTS = 'postComment/POST_COMMENTS';
export const SEND_COMMENTS = 'postComment/SEND_COMMENTS';

export const postComment = () => ({ type: POST_COMMENTS });
export const sendComment = payload => ({ type: SEND_COMMENTS, payload });

export const initialState = {
    name: '',
    comment: ''
};

const postCommentReducer = (state = initialState, action) => {
    if (action.type === SEND_COMMENTS) {
        return { ...state, ...action.payload };
    } else {
        return state;
    }
};

export function* postCommentSagaWatcher() {
    yield takeEvery(POST_COMMENTS, sagaWorker);
}

export function* sagaWorker() {
    const payload = yield call(getComment);

    yield put(sendComment(payload));
}

export async function getComment() {
    const form = document.getElementById('comments');
    const formData = { name: form[0].value, comment: form[1].value };
    const postURL = `https://boiling-refuge-66454.herokuapp.com/images/${window.location.pathname.slice(1)}/comments`;

    fetch(postURL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    return formData;
}

export default postCommentReducer;
