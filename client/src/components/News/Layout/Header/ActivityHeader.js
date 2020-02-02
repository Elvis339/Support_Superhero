import React, { Fragment } from 'react';
import Navigation from '../../../Layout/Navigation/Navigation';
import { Row, ButtonGroup, FormControl } from 'react-bootstrap';

import './ActivityHeader.css'

const activityHeader = props => {
    return (
        <Fragment>
            <Navigation show={false} />
            <div className='ah-background'>
                <Row className='justify-content-center py-3'>
                    <ButtonGroup aria-label="Basic example">
                        <FormControl type='date' className='mx-2 mt-2 ah-btn' onChange={props.changeDate} />
                        <button className='mx-2 ah-btn' data-type='today' onClick={props.changeDate} >{Date().slice(0, 15)}</button>
                        <hr />
                    </ButtonGroup>
                </Row>
            </div>
        </Fragment>
    )
};

export default activityHeader;