import React, { Fragment } from 'react';
import Notification from '../../Notification/Notification';
import { Container, Row } from 'react-bootstrap';

const frame = props => {
    return (
        <Fragment>
            <Notification />
            <Container>
                <Row>
                    {props.children}
                </Row>
            </Container>
        </Fragment>
    )
};

export default frame;