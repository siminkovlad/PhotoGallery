import React from 'react';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { App } from '../../components/App';

describe('App tests', () => {
    it('Create snapshot', () => {
        const mockStore = configureStore();
        const initialState = {
            fetchedPhotos: [
                { 'id': 237, 'url': 'https://picsum.photos/id/237/300/200' },
                { 'id': 238, 'url': 'https://picsum.photos/id/238/300/200' }
            ],
            loading: false
        };
        const store = mockStore(initialState);
        const appComponent = shallow(<Provider store={store}><App/></Provider>);

        expect(toJson(appComponent)).toMatchSnapshot();
    });
});
