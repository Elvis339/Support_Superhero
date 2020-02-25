import React, { Component } from 'react';
import axios from 'axios';
import { getJwt } from '../../helpers/jwt';

import Alert from '../../components/Layout/Alerts/Alerts';
import Spinner from '../../components/Layout/Spinner/Spinner';

class Resource extends Component {

    state = {
        loading: true,
        error: null,
        payload: [],
    };

    getFromDB(param) {
        axios.get(param, { headers: { "Authorization": `Bearer: ${getJwt()}` }}).then(res => {
            this.setState({
                payload: res.data,
                loading: false
            })
        }).catch(err => this.setState({ error: err }))
    }

    componentDidMount() {
        this.getFromDB(this.props.path);
    };

    componentDidUpdate(prevProps) {
        if(this.props.path !== prevProps.path) {
            return this.getFromDB(this.props.path)
        }
        return
    };

    render() {
        if (this.state.error) {
            if (this.state.error.response.data.status === 404) {
                return <Alert variant='warning' title='Not found...' />
            }
            return <Alert variant='danger' title='Ooops, network tab has more info.' />
        } else if (this.state.loading) {
            return <Spinner animation='grow' size='lg' centered={true} />
        } else {
            return this.props.render(this.state)
        }
    };
};

export default Resource;
