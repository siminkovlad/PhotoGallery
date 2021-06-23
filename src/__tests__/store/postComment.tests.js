import { put, takeEvery, call } from 'redux-saga/effects';

import reducer, {
    initialState,
    POST_COMMENTS,
    SEND_COMMENTS,
    postComment,
    sendComment,
    postCommentSagaWatcher,
    sagaWorker,
    getComment
} from '../../store/postComment';

const payload = {
    name: 'Vlad',
    comment: 'Awesome'
};

describe('postComment tests', () => {
    describe('postCommentReducer tests', () => {
        it(SEND_COMMENTS, () => {
            const action = {
                type: SEND_COMMENTS,
                payload: {
                    ...payload
                }
            };

            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                ...action.payload
            });
        });
    });

    describe('postCommentReducer actions tests', () => {
        it('postComment', () => {
            expect(postComment()).toEqual({ type: POST_COMMENTS });
        });

        it('sendComment', () => {
            expect(sendComment(payload)).toEqual({ type: SEND_COMMENTS, payload });
        });
    });

    describe('postCommentSagas tests', () => {
        it('postCommentSagaWatcher', () => {
            const generator = postCommentSagaWatcher();

            expect(generator.next().value).toEqual(takeEvery(POST_COMMENTS, sagaWorker));
            expect(generator.next().done).toBeTruthy();
        });

        it('sagaWorker', () => {
            const generator = sagaWorker();

            expect(generator.next().value).toEqual(call(getComment));
            expect(generator.next(payload).value).toEqual(put({ type: SEND_COMMENTS, payload }));
            expect(generator.next().done).toBeTruthy();
        });
    });
});
