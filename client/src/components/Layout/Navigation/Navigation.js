import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';

const navigation = props => (
    <Navbar bg="light" expand="lg">
        <Link to='/'>
            <span className='navbar-brand'>Dashboard</span>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link className='nav-link' to='/add'>Add article</Link>
                <Link className='nav-link' to='/me'>My profile</Link>
                <Link className='nav-link' to='/logout'>Log out</Link>
                <NavDropdown title="Select filter" id="basic-nav-dropdown">
                    <NavDropdown.Item name='filter' onClick={props.handleClick}>Shepherd</NavDropdown.Item>
                    <NavDropdown.Item name='filter' onClick={props.handleClick}>Project</NavDropdown.Item>
                    <NavDropdown.Item name='filter' onClick={props.handleClick}>Task</NavDropdown.Item>
                    <NavDropdown.Item name='filter' onClick={props.handleClick}>Discussion</NavDropdown.Item>
                    <NavDropdown.Item name='filter' onClick={props.handleClick}>Notes</NavDropdown.Item>
                    <NavDropdown.Item name='filter' onClick={props.handleClick}>Payments</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Form inline>
                <FormControl onChange={props.handleChange} name='search' type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-dark">Search</Button>
            </Form>
        </Navbar.Collapse>
    </Navbar>
);

export default navigation;