import React from 'react';
import { Row, ButtonGroup } from 'react-bootstrap';
import helpers from '../../../../helpers/helpers';
import './ActivityHeader.css'

// const ker = e => {
//     if (e.target.disabled) {
//         return 
//     } else {
//         return
//     }
// }

const activityHeader = props => {
    return (
        <div className='ah-background'>
            <Row className='justify-content-center py-3'>
                <ButtonGroup aria-label="Basic example" onClick={e => console.log(e)}>
                    <button className='mx-2 ah-btn'>Previous Day</button>
                    <button className='mx-2 ah-btn'>{helpers.dates()}</button>
                    <button disabled className='mx-2 ah-btn disabled'>Next Day</button>
                    <hr/>
                </ButtonGroup>
            </Row>
        </div>
    )
};

export default activityHeader;