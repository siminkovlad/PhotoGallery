import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter, Route } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    applyMiddleware,
    createStore
} from 'redux';

import { App } from './components/index';

import reducer from './store';
import { sagaWatcher } from './store/fetchPhotos';
import { commentsSagaWatcher } from './store/fetchComments';
import { postCommentSagaWatcher } from './store/postComment';

const saga = createSagaMiddleware();

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(saga)
));

saga.run(sagaWatcher);
saga.run(commentsSagaWatcher);
saga.run(postCommentSagaWatcher);

const rootElement = document.getElementById('root');

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={App}/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, rootElement);
