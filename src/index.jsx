import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter, Route } from 'react-router-dom';
import {
    applyMiddleware,
    compose,
    createStore
} from 'redux';

import { App } from './components/index';

import { sagaWatcher } from './redux/fetchPhotos';
import { commentsSagaWatcher } from './redux/fetchComments';
import { postCommentSagaWatcher } from './redux/postComment';

import reducer from './redux';

const saga = createSagaMiddleware();

const store = createStore(reducer, compose(
    applyMiddleware(saga),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

saga.run(sagaWatcher);
saga.run(commentsSagaWatcher);
saga.run(postCommentSagaWatcher);

const rootElement = document.getElementById('root');

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={App} />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, rootElement);
