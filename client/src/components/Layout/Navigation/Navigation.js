import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logout from '../../../helpers/logoff';
import helpers from '../../../helpers/helpers';
import { APP_MODULES } from '../../../helpers/APP_MODULES.d'

const navigation = props => {
    return (
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
                    <Link className='nav-link' to='/search'>Search</Link>
                    <Link className='nav-link' to='/calculator'>Calculator</Link>
                    {/* <Link className='nav-link' to='/statistics'>Statistics</Link> */}
                    {props.show ? <NavDropdown title="Select filter" id="basic-nav-dropdown">
                        {APP_MODULES.map((module, index) => <NavDropdown.Item key={index} name='filter' onClick={props.handleClick}>{helpers.capitalize(module)}</NavDropdown.Item>)}
                    </NavDropdown> : null}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default navigation;