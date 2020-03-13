import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const tooltip = props => (
    <Fragment>
        <OverlayTrigger
            placement='bottom'
            overlay={
                <Tooltip id={`tooltip-bottom`}>
                    {props.body}
                </Tooltip>
            }
        >
            <Link className='btn btn-primary mt-2 mb-5' to={props.url}>
                Share the file
            </Link>
        </OverlayTrigger>{' '}
    </Fragment>
);

export default tooltip;