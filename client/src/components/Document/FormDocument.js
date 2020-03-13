import React, { Fragment } from 'react';
import Navigation from '../Layout/Navigation/Navigation';
import { Container, Button, Form } from 'react-bootstrap';
import helper from '../../helpers/helpers';
import { APP_MODULES } from '../../helpers/APP_MODULES.d';

const editor = props => {
    return (
        <Fragment>
            <Navigation show={false} />
            <Container>
                <Form onSubmit={props.saveToDB} encType='multipart/form-data'>
                    <Form.Group>
                        <Form.Label>Select type*</Form.Label>
                        <Form.Control required as="select" name='category' onChange={props.change}>
                            <option defaultValue={"0"} disabled selected>Select appropriate type</option>
                            {APP_MODULES.map((type, index) => <option key={index}>{helper.capitalize(type)}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Add title*</Form.Label>
                        <Form.Control required name='title' type='text' placeholder="Add title" onChange={props.change}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Add sharable file</Form.Label>
                        <Form.Control 
                        type='file'
                        name='sharable_files' 
                        placeholder="Add sharable file"
                        onChange={props.onFileChange} />
                    </Form.Group>
                    {props.children}
                    <Button className='my-3' type='submit'>Save</Button>
                </Form>
            </Container>
        </Fragment>
    )
}

export default editor;