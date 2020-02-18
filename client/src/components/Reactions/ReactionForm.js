import React, { useState, Fragment } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const ReactionForm = props => {
    const [show, setShow] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Fragment>
            <Button variant='primary' className='mx-2' onClick={handleShow}>No 😔</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tell us why...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={props.handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email address (optional)</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' onChange={props.change} />
                            <Form.Text className="text-muted">
                                Dont worry we wont spam you.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder="Share your toughts with us" required maxLength={200} name='description' onChange={props.change} />
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Send 🤝
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Fragment>
    )

};

export default ReactionForm;