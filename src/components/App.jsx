import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

import {
    Header,
    Main,
    Footer,
    Loader
} from './index';
import { GlobalStyle } from '../styles/globalStyles';

import { requestPhotos } from '../store/fetchPhotos';

export const App = () => {
    const loading = useSelector(state => state.fetchPhotos.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestPhotos());
    }, []);

    return (
        <Container fluid>
            <GlobalStyle />
            <Header />
            {loading ? <Loader /> : <Main />}
            <Footer />
        </Container>
    );
};
