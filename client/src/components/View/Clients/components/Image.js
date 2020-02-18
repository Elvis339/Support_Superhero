import React, { Fragment } from 'react';
import CenterHorizontally from '../../../Layout/CenterHorizontaly/CenterHorizontaly';

const image = props => (
    <Fragment>
        <CenterHorizontally>
                <img alt='Sharable file' className='border py-2 px-2' src={props.src} /><br></br>
        </CenterHorizontally>
    </Fragment>
)

export default image;
