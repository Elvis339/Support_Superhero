import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, DropdownButton } from 'react-bootstrap';

const navigation = props => (
    <Nav activeKey="/home">
        <Nav.Item>
            <Link className='nav-link' to='/profile'>My profile</Link>
        </Nav.Item>
        <Nav.Item>
            <Link className='nav-link' to='/add'>Add article</Link>
        </Nav.Item>
        <Nav.Item>
            <Link className='nav-link' to='/logout'>Log out</Link>
        </Nav.Item>
        <Nav.Item>
            <DropdownButton id="dropdown-basic-button" title="Filter">
                <h6 class="dropdown-header">Add filter</h6>
                <Link className='dropdown-item' to='shepherd'>Shepherd</Link>
            </DropdownButton>
        </Nav.Item>
    </Nav>
);

export default navigation;