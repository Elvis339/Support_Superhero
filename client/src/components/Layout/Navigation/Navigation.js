import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import logout from '../../../helpers/logoff';
import helpers from '../../../helpers/helpers';

let modules = [
    'shepherd',
    'project',
    'task',
    'discussion',
    'notes',
    'expenses',
    'activity',
    'payments'
]

const navigation = props => (
    <Navbar bg="light" expand="lg">
        <Link to='/'>
            <span className='navbar-brand'>Dashboard</span>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <NavDropdown title='Profile'>
                    <Link className='dropdown-item' to='/me'>Edit me</Link>
                    <Link className='dropdown-item' to='/login' onClick={logout}>Log out</Link>
                </NavDropdown>
                <NavDropdown title='Documents'>
                    <Link className='dropdown-item' to='/add'>Add document</Link>
                </NavDropdown>
                <Link className='nav-link' to='/tasks'>Tasks</Link>
                <Link className='nav-link' to='/news'>News</Link>
                <NavDropdown title="Select filter" id="basic-nav-dropdown">
                { modules.map((module, index) => <NavDropdown.Item key={index} name='filter' onClick={props.handleClick}>{helpers.capitalize(module)}</NavDropdown.Item>) }
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