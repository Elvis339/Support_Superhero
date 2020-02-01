import React from 'react';
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
        <Container>
            <Form onSubmit={props.saveToDB}>
                <Form.Group>
                    <Form.Label>Select type</Form.Label>
                    <Form.Control as="select" name='category' onChange={props.change}>
                        {modules.map((type, index) => <option key={index}>{helper.capitalize(type)}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Add title</Form.Label>
                    <Form.Control name='title' type='text' placeholder="Type - Name" onChange={props.change}></Form.Control>
                </Form.Group>
                {props.children}
                <Button type='submit'>Save</Button>
            </Form>
        </Container>
    )
}

export default editor;