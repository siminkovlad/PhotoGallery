import { put, takeEvery, call } from 'redux-saga/effects';
import fetchMock from 'fetch-mock';

import reducer, {
    initialState,
    FETCH_PHOTOS,
    SHOW_LOADER,
    HIDE_LOADER,
    REQUEST_PHOTOS,
    getPhotos,
    showLoader,
    hideLoader,
    requestPhotos,
    sagaWatcher,
    sagaWorker,
    fetchData
} from '../../store/fetchPhotos';

const payload = [
    { 'id': 237, 'url': 'https://picsum.photos/id/237/300/200' },
    { 'id': 238, 'url': 'https://picsum.photos/id/238/300/200' }
];

describe('fetchPhotos tests', () => {
    describe('fetchPhotosReducer tests', () => {
        it(FETCH_PHOTOS, () => {
            const action = {
                type: FETCH_PHOTOS,
                payload: [
                    ...payload
                ]
            };

            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                fetchedPhotos: action.payload
            });
        });

        it(SHOW_LOADER, () => {
            const action = { type: SHOW_LOADER };

            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                loading: true
            });
        });

        it(HIDE_LOADER, () => {
            const action = { type: HIDE_LOADER };

            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                loading: false
            });
        });
    });

    describe('fetchPhotos actions tests', () => {
        it('showLoader', () => {
            expect(showLoader()).toEqual({ type: SHOW_LOADER });
        });

        it('hideLoader', () => {
            expect(hideLoader()).toEqual({ type: HIDE_LOADER });
        });

        it('requestPhotos', () => {
            expect(requestPhotos()).toEqual({ type: REQUEST_PHOTOS });
        });

        it('getPhotos', () => {
            expect(getPhotos(payload)).toEqual({
                type: FETCH_PHOTOS,
                payload
            });
        });
    });

    describe('fetchPhotosSagas tests', () => {
        it('sagaWatcher', () => {
            const generator = sagaWatcher();

            expect(generator.next().value).toEqual(takeEvery(REQUEST_PHOTOS, sagaWorker));
            expect(generator.next().done).toBeTruthy();
        });

        it('sagaWorker', () => {
            const generator = sagaWorker();

            expect(generator.next().value).toEqual(put({ type: SHOW_LOADER }));
            expect(generator.next().value).toEqual(call(fetchData));
            expect(generator.next(payload).value).toEqual(put({ type: FETCH_PHOTOS, payload }));
            expect(generator.next().value).toEqual(put({ type: HIDE_LOADER }));
            expect(generator.next().done).toBeTruthy();
        });
    });

    describe('fetchData tests', () => {
        it('getRequest', () => {
            const response = [
                ...payload
            ];

            fetchMock.get('https://boiling-refuge-66454.herokuapp.com/images', response);

            fetchData().then(data => expect(data).toEqual(response));

            fetchMock.reset();
        });
    });
});
