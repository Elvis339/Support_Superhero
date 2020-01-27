import React, { Fragment } from 'react';
import { Card, Badge } from 'react-bootstrap';

const newsInfo = props => {

    const formatTime = prop => {
        let arr = prop.split('T')

        return arr[1].slice(0, 5);
    }

    return (
        <Fragment>
            <Card body className='my-3 bg-light'>
                <h6 className='text-center'>
                    {props.created_by}
                    <Badge className='mx-2 py-2 px-2 text-center' variant="success">{formatTime(props.timestamp)}</Badge>
                </h6>
                <hr />
                <p className='lead'>{props.body}</p>
            </Card>
        </Fragment>
    )
};

export default newsInfo;