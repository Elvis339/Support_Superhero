import { Component } from 'react';
import axios from 'axios';

class Resource extends Component {
    state = {
        loading: true,
        error: null,
        payload: []
    };

    componentDidMount() {
        axios.get(this.props.path).then(res => {
            this.setState({
                payload: res.data,
                loading: false
            })
        }).catch(err => this.setState({ error: err }))
    };

    render() {
        return this.props.render(this.state)
    };
};

export default Resource;
