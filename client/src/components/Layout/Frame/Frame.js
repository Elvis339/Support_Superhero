import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';

const frame = props => {
    return (
        <Container>
            <Row>
                {props.children}
            </Row>
        </Container>
    )
};

export default frame;