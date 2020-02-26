import React, { Fragment } from 'react';
import Frame from '../Layout/Frame/Frame';
import Navigation from '../Layout/Navigation/Navigation';
import Centered from '../Layout/Centered/Centered';
import { Form, Button, Alert } from 'react-bootstrap';

const calculator = props => {
    let pricingStructure = ['Legacy', 'Per Seat'];
    let subscriptionType = ['Monthly', 'Yearly'];

    return (
        <Fragment>
            <Navigation show={false} />
            <Frame row={false}>
                <Centered height='70vh'>
                    <div className='w-50'>
                        <Form onChange={props.handleChange}>
                            <Form.Group controlId="pricing">
                                <Form.Label>Select Pricing Structure</Form.Label>
                                <Form.Control as="select" name='pricing'>
                                    {pricingStructure.map((key, index) => (
                                        <option key={index}>{key}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="subscription">
                                <Form.Label>Select Subscription</Form.Label>
                                <Form.Control as="select" name='subscription'>
                                    {subscriptionType.map((key, index) => (
                                        <option key={index}>{key}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="users">
                                <Form.Label>Chargeable Users</Form.Label>
                                <Form.Control name='users' type="number" placeholder="Enter chargeable users" />
                            </Form.Group>

                            <Button onClick={props.calculate}>Calculate</Button>
                        </Form>
                        {props.result === null ? null : <Fragment>
                            <Alert className='my-3' variant='success'>
                                <strong className='text-center'>{props.result}$</strong> <br></br>
                                {props.description}
                            </Alert>
                        </Fragment>}
                    </div>
                </Centered>
            </Frame>
        </Fragment>
    )
};

export default calculator
