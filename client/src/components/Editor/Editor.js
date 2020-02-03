import React, { Fragment } from 'react';
import Navigation from '../Layout/Navigation/Navigation';
import { Container, Button, Form } from 'react-bootstrap';
import helper from '../../helpers/helpers';

let modules = [
    'shepherd',
    'project',
    'task',
    'discussion',
    'notes',
    'expenses',
    'activity',
    'payments'
];

const editor = props => {
    return (
        <Fragment>
            <Navigation show={false} />
            <Container>
                <Form onSubmit={props.saveToDB}>
                    <Form.Group>
                        <Form.Label>Select type</Form.Label>
                        <Form.Control required as="select" name='category' onChange={props.change}>
                            <option defaultValue="0" disabled selected>Select appropriate type</option>
                            {modules.map((type, index) => <option key={index}>{helper.capitalize(type)}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Add title</Form.Label>
                        <Form.Control required name='title' type='text' placeholder="Add title" onChange={props.change}></Form.Control>
                    </Form.Group>
                    {props.children}
                    <Button type='submit'>Save</Button>
                </Form>
            </Container>
        </Fragment>
    )
}

export default editor;