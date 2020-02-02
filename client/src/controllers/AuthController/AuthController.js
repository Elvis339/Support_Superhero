import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { getJwt } from '../../helpers/jwt';


class AuthenticatedComponent extends Component {
    state = {
        user: null,
    }

    componentDidMount() {
        const jwt = getJwt()

        if (!jwt) {
            this.props.history.push('/login')
        }

        axios.get('/api/v1/users', {
            headers:{
                "Authorization": `Bearer ${jwt}`
            }
        }).then(res => {
            this.setState({
                user: res.data
            })
        })
        .catch(err => {
            localStorage.removeItem('token')
            this.props.history.push('/login')
        })
    }


    render() {
        if(this.state.user === null) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
        return (
            <Fragment>
                {this.props.children}
            </Fragment>
        )
    }
}

export default withRouter(AuthenticatedComponent)