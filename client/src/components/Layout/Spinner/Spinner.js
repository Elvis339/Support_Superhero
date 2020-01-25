import React from 'react';
import { Spinner } from 'react-bootstrap';

const spinner = props => {

    if (props.centered) {
        return (
            <div style={{height: '70vh'}} className='d-flex align-items-center'>
                <Spinner className='mx-auto' animation={props.animation} size={props.size || 'sm'} />
            </div>
        )
    }
    return (
        <Spinner animation={props.animation} size={props.size || 'sm'} />
    )
}

export default spinner;
