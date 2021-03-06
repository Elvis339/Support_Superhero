import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './Card.css'

const card = props => {
    return (
        <Fragment>
            <Card className='Card mx-3 my-5'>
                <Card.Title className='text-center'>
                    {props.title}
                </Card.Title>
                <Card.Body>
                    {props.body}
                </Card.Body>
                { props.uri ? <Link className='text-center btn btn-info' to={props.uri}>View</Link> : null }
            </Card>
        </Fragment>
    )
}

export default card;