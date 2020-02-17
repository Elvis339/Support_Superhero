import React  from 'react';
import { Row } from 'react-bootstrap';

const centerHorizontally = props => (
    <Row className='justify-content-center'>
        {props.children}
    </Row>
)

export default centerHorizontally;