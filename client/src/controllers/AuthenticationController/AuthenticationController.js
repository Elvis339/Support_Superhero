import React, { Component } from 'react';
import axios from 'axios';
import Login from '../../components/Login/Login';

class AuthenticationController extends Component {
    constructor(props) {
        super(props)
        
        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    };

    state = {
        status: null,
        email: null,
        password: null,
    };

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    async handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await axios.post('/api/v1/login', {
                email: this.state.email,
                password: this.state.password,
            })
            localStorage.setItem('token', res.data.token);
            this.props.history.push('/');
        }
        catch (err) {
            this.setState({ status: err });
        }
    };


    render() {
        return (
            <Login
                status={this.state.status} 
                change={e => this.handleChange(e)}
                handleSubmit={e => this.handleSubmit(e)}
            />
        )
    }
};

export default AuthenticationController;