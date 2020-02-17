import React, { Fragment } from 'react';
import Tooltip from '../../../Layout/Tooltip/Tooltip';
import CenterHorizontally from '../../../Layout/CenterHorizontaly/CenterHorizontaly';

const image = props => (
    <Fragment>
        <CenterHorizontally>
            <img alt='Sharable file' className='border py-2 px-2' src={props.src} /><br></br>
        </CenterHorizontally>
        {/* <CenterHorizontally>
            <Tooltip 
                body="Click to share with clients"
                url={props.url}
            />
        </CenterHorizontally> */}
    </Fragment>
)

export default image;
