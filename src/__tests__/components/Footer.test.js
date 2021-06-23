import React from 'react';
import toJson from 'enzyme-to-json';

import { Footer } from '../../components/Footer';

describe('Footer tests', () => {
    const footerContainer = shallow(<Footer/>);

    it('Create snapshot', () => {
        expect(toJson(footerContainer)).toMatchSnapshot();
    });

    it('Renders text in footer', () => {
        expect(footerContainer.text(`© ${new Date().getFullYear()}`));
    });
});
