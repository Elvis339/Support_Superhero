import React from 'react';
import Container from '@material-ui/core/Container/Container'
import PrimarySearchAppBar from '../UI/Navbar/Navbar'
import Aux from '../../hoc/Aux';
// import classes from './Layout.css';

const layout = ( props ) => (
    <Aux>
        <PrimarySearchAppBar />
        <Container>
            {props.children}
        </Container>
    </Aux>
);

export default layout;