import React from 'react';
import Aux from '../Hoc/Aux';
import Navigation from '../Layout/Navigation/Navigation';

const dashboard = props => (
    <Aux>
        <Navigation />
        <div>
        Hello from dashboard
        </div>
    </Aux>
);

export default dashboard;