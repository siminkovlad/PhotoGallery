import { call, put, takeEvery } from '@redux-saga/core/effects';

export const REQUEST_COMMENTS = 'photo-gallery/src/redux/fetchComments/REQUEST_COMMENTS';
export const FETCH_COMMENTS = 'photo-gallery/src/redux/fetchComments/FETCH_COMMENTS';
export const SHOW_POPUP = 'photo-gallery/src/redux/fetchComments/SHOW_POPUP';
export const HIDE_POPUP = 'photo-gallery/src/redux/fetchComments/HIDE_POPUP';

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
    const commentsURL = `https://boiling-refuge-66454.herokuapp.com/images/${window.location.pathname.slice(1)}`;
    const response = await fetch(commentsURL);
    const json = await response.json();

    return json;
}

export default commentsReducer;
