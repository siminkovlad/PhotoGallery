import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { FooterStyled } from '../styles/styledFooter';

export const Footer = () => (
    <Row>
        <Col>
            <FooterStyled>© {new Date().getFullYear()}</FooterStyled>
        </Col>
    </Row>
);
