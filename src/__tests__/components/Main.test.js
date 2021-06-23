import React from 'react';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { Main } from '../../components/Main';

describe('Main tests', () => {
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
        const mainComponent = shallow(<Provider store={store}><Main/></Provider>);

        expect(toJson(mainComponent)).toMatchSnapshot();
    });
});
