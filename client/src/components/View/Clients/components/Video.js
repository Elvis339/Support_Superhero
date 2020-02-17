import React, { Fragment } from 'react';
import Tooltip from '../../../Layout/Tooltip/Tooltip';
import CenterHorizontally from '../../../Layout/CenterHorizontaly/CenterHorizontaly';

const video = props => (
    <Fragment>
        <CenterHorizontally>
            <video className='border py-2 px-2' width={props.width || "320"} height={props.height || "240"} controls>
                <source src={props.src} type="video/mp4" />
            </video><br></br>
        </CenterHorizontally>
    </Fragment>
)

export default video;
