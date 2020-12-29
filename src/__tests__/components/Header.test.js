import React from 'react';
import toJson from 'enzyme-to-json';

import { Header } from '../../components/Header';

describe('Header tests', () => {
    const headerContainer = shallow(<Header/>);

    it('Create snapshot', () => {
        expect(toJson(headerContainer)).toMatchSnapshot();
    });

    it('Renders h1 tag', () => {
        expect(headerContainer.find('h1')).toHaveLength(1);
    });
});
