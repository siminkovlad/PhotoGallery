import { call, put, takeEvery } from '@redux-saga/core/effects';

export const FETCH = 'photo-gallery/src/redux/fetchPhotos/FETCH';
export const REQUEST_PHOTOS = 'photo-gallery/src/redux/fetchPhotos/REQUEST_PHOTOS';
export const SHOW_LOADER = 'photo-gallery/src/redux/fetchPhotos/SHOW_LOADER';
export const HIDE_LOADER = 'photo-gallery/src/redux/fetchPhotos/HIDE_LOADER';

export const getPhotos = payload => ({ type: FETCH, payload });
export const requestPhotos = () => ({ type: REQUEST_PHOTOS });
export const showLoader = () => ({ type: SHOW_LOADER });
export const hideLoader = () => ({ type: HIDE_LOADER });

export const initialState = {
    fetchedPhotos: [],
    loading: true
};

const fetchPhotosReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH:
            return { ...state, fetchedPhotos: action.payload };
        case SHOW_LOADER:
            return { ...state, loading: true };
        case HIDE_LOADER:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export function* sagaWatcher() {
    yield takeEvery(REQUEST_PHOTOS, sagaWorker);
}

export function* sagaWorker() {
    yield put(showLoader());

    const payload = yield call(fetchData);

    yield put(getPhotos(payload));
    yield put(hideLoader());
}

export async function fetchData() {
    const photosURL = 'https://boiling-refuge-66454.herokuapp.com/images';
    const response = await fetch(photosURL);
    const json = await response.json();

    return json;
}

export default fetchPhotosReducer;
