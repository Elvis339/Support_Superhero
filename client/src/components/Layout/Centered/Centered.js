import React from 'react';
import { Row } from 'react-bootstrap';

const centered = props => (
    <Row className='justify-content-center align-items-center' style={{height: props.height}}>
        {props.children}
    </Row>
)

export default centered;