import React, { Fragment } from 'react';
import Notification from '../../Notification/Notification';
import { Container, Row } from 'react-bootstrap';

const frame = props => {
    return (
        <Fragment>
            <Notification />
            <Container>
                {props.row ? <Row>
                    {props.children}
                </Row> : props.children }
            </Container>
        </Fragment>
    )
};

export default frame;