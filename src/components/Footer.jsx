import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { FooterStyled } from '../styles/styledFooter';

export const Footer = () => (
    <Row>
        <Col>
            <FooterStyled>© 2020</FooterStyled>
        </Col>
    </Row>
);
