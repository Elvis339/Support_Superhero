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
                <Link className='nav-link' to='/logout'>Log out</Link>

                {/* @TODO: Fetch preview based on URL */}


                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <h6 className="dropdown-header">Add filter</h6>
                    <Link className='dropdown-item' to='shepherd'>Shepherd</Link>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
            </Form>
        </Navbar.Collapse>
    </Navbar>
);

export default navigation;