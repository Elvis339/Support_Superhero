import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const AlertDismissibleExample = props => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant={props.variant} onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{props.title}</Alert.Heading>
            </Alert>
        );
    }
    return (
        <div></div>
    )
}

export default AlertDismissibleExample;