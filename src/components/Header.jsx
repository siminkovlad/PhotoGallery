import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { HeaderStyled } from '../styles/styledHeader';

export const Header = () => (
    <Row>
        <Col>
            <HeaderStyled>
                <h1>PHOTO GALLERY</h1>
            </HeaderStyled>
        </Col>
    </Row>
);
