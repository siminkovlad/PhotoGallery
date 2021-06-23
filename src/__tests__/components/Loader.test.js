import React from 'react';
import toJson from 'enzyme-to-json';

import { Loader } from '../../components/Loader';

describe('Loader tests', () => {
    const loaderContainer = shallow(<Loader/>);

    it('Create snapshot', () => {
        expect(toJson(loaderContainer)).toMatchSnapshot();
    });

    it('Renders without any text', () => {
        expect(loaderContainer.text(''));
    });
});
