import { put, takeEvery, call } from 'redux-saga/effects';
import fetchMock from 'fetch-mock';

import reducer, {
    initialState,
    REQUEST_COMMENTS,
    FETCH_COMMENTS,
    SHOW_POPUP,
    HIDE_POPUP,
    getComments,
    requestComments,
    showPopUp,
    hidePopUp,
    commentsSagaWatcher,
    sagaWorker,
    fetchComments
} from '../../store/fetchComments';

const payload = {
    'id': 237,
    'url': 'https://picsum.photos/id/237/600/400',
    'comments': [
        {
            'id': 153,
            'text': 'Крутая фотка',
            'date': 1578054737927
        }
    ]
};

describe('fetchComments tests', () => {
    describe('commentsReducer', () => {
        it(SHOW_POPUP, () => {
            const action = { type: SHOW_POPUP };

            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                show: true
            });
        });

        it(HIDE_POPUP, () => {
            const action = { type: HIDE_POPUP };

            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                show: false
            });
        });

        it(FETCH_COMMENTS, () => {
            const action = {
                type: FETCH_COMMENTS,
                payload: {
                    ...payload
                }
            };

            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                comments: action.payload
            });
        });
    });

    describe('fetchComments actions tests', () => {
        it('getComments', () => {
            expect(getComments(payload)).toEqual({
                type: FETCH_COMMENTS,
                payload
            });
        });

        it('requestComments', () => {
            expect(requestComments()).toEqual({ type: REQUEST_COMMENTS });
        });

        it('showPopUp', () => {
            expect(showPopUp()).toEqual({ type: SHOW_POPUP });
        });

        it('hidePopUp', () => {
            expect(hidePopUp()).toEqual({ type: HIDE_POPUP });
        });
    });

    describe('fetchCommentsSagas tests', () => {
        it('commentsSagaWatcher', () => {
            const generator = commentsSagaWatcher();

            expect(generator.next().value).toEqual(takeEvery(REQUEST_COMMENTS, sagaWorker));
            expect(generator.next().done).toBeTruthy();
        });

        it('sagaWorker', () => {
            const generator = sagaWorker();

            expect(generator.next().value).toEqual(call(fetchComments));
            expect(generator.next(payload).value).toEqual(put({ type: FETCH_COMMENTS, payload }));
            expect(generator.next().done).toBeTruthy();
        });
    });

    describe('fetchComments tests', () => {
        it('getRequest', () => {
            const response = {
                ...payload
            };

            fetchMock.get(`https://boiling-refuge-66454.herokuapp.com/images/${window.location.pathname.slice(1)}`, response);

            fetchComments().then(data => expect(data).toEqual(response));

            fetchMock.reset();
        });
    });
});
