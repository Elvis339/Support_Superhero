import React, { Fragment } from 'react'
import { Form, FormControl } from 'react-bootstrap';
import Navigation from '../Layout/Navigation/Navigation';

const search = props => {
    return (
        <Fragment>
            <Navigation />
            <h3 className='text-center my-3'>Find what you are looking for</h3>
            <Form className='justify-content-center mt-3' inline>
                <FormControl name='search' type="text" placeholder="Search" className="mr-sm-2" onChange={props.handleChange} />
            </Form>
        </Fragment>
    )
};

export default search;