import React from 'react';
import Notification from '../../Notification/Notification';
import { Container, Row } from 'react-bootstrap';

const frame = props => {
    return (
        <div>
            <Notification />
            <Container>
                <Row>
                    {props.children}
                </Row>
            </Container>
        </div>
    )
};

export default frame;