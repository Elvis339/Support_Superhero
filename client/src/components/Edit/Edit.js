import React from 'react';
import { Link } from 'react-router-dom';

const editIcon = props => (
    <Link to={props.path}>
        <img style={{ cursor: 'pointer' }} className='mx-2' src='/assets/edit.svg' height='30px' width='30px' />
    </Link>
)

export default editIcon;