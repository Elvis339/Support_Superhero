import React, { Fragment } from 'react';
import Navigation from '../../../Layout/Navigation/Navigation';
import CenterHorizontally from '../../../Layout/CenterHorizontaly/CenterHorizontaly';
import { ButtonGroup, FormControl } from 'react-bootstrap';

import './ActivityHeader.css'

const activityHeader = props => {
    return (
        <Fragment>
            <Navigation show={false} />
            <div className='ah-background'>
                <CenterHorizontally>
                    <div className='py-3'>
                        <ButtonGroup aria-label="Basic example">
                            <FormControl type='date' className='mx-2 mt-2 ah-btn' onChange={props.changeDate} />
                            <button className='mx-2 ah-btn' data-type='today' onClick={props.changeDate} >{Date().slice(0, 15)}</button>
                            <hr />
                        </ButtonGroup>
                    </div>
                </CenterHorizontally>
            </div>
        </Fragment>
    )
};

export default activityHeader;