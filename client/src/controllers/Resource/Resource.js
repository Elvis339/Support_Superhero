import { Component } from 'react';
import axios from 'axios';
import { getJwt } from '../../helpers/jwt';

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
        return this.props.render(this.state)
    };
};

export default Resource;
