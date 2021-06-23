import { call, put, takeEvery } from '@redux-saga/core/effects';

import comments237 from '../data/comments/237';
import comments238 from '../data/comments/238';
import comments239 from '../data/comments/239';
import comments240 from '../data/comments/240';
import comments241 from '../data/comments/241';
import comments242 from '../data/comments/242';

const comments = {
    237: comments237,
    238: comments238,
    239: comments239,
    240: comments240,
    241: comments241,
    242: comments242
};

export const REQUEST_COMMENTS = 'fetchComments/REQUEST_COMMENTS';
export const FETCH_COMMENTS = 'fetchComments/FETCH_COMMENTS';
export const SHOW_POPUP = 'fetchComments/SHOW_POPUP';
export const HIDE_POPUP = 'fetchComments/HIDE_POPUP';

export const getComments = payload => ({ type: FETCH_COMMENTS, payload });
export const requestComments = () => ({ type: REQUEST_COMMENTS });
export const showPopUp = () => ({ type: SHOW_POPUP });
export const hidePopUp = () => ({ type: HIDE_POPUP });

export const initialState = {
    show: false,
    comments: {}
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMENTS:
            return { ...state, comments: action.payload };
        case SHOW_POPUP:
            return { ...state, show: true };
        case HIDE_POPUP:
            return { ...state, show: false };
        default:
            return state;
    }
};

export function* commentsSagaWatcher() {
    yield takeEvery(REQUEST_COMMENTS, sagaWorker);
}

export function* sagaWorker() {
    const payload = yield call(fetchComments);

    yield put(getComments(payload));
}

export async function fetchComments() {
    // const commentsURL = `https://boiling-refuge-66454.herokuapp.com/images/${window.location.pathname.slice(1)}`;
    // const response = await fetch(commentsURL);
    // const json = await response.json();

    return comments[window.location.pathname.slice(1)];
}

export default commentsReducer;
