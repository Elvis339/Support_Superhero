import React, { Component, Fragment } from 'react';
import Navigation from '../../components/Layout/Navigation/Navigation';
import Frame from '../../components/Layout/Frame/Frame';
import Card from '../../components/Layout/Cards/Cards';
import Resource from '../Resource/Resource';

import io from 'socket.io-client';

import Notification from '../../components/Notification/Notification';

class DashboardController extends Component {
    constructor(props) {
        super(props)
        this.handler.bind(this);
    };

    state = {
        filter: 'all',
        search: '',
        notifications: null,
        socket_uri: 'http://localhost:3001'
    };

    handler(e, param) {
        if (param === 'click') {
            return this.setState({
                [e.target.name]: String(e.target.textContent).toLocaleLowerCase()
            })
        }
        return this.setState({
            [e.target.name]: String(e.target.value).toLocaleLowerCase()
        })
    };

    componentDidMount() {
        let socket = io(this.state.socket_uri)

        socket.on('notifications', data => {
            this.setState({
                notifications: data
            })
        })
    }

    componentDidUpdate() {
        let socket = io(this.state.socket_uri)

        socket.on('notifications', data => {
            this.setState({
                notifications: data
            })
        })
    }

    render() {
        return (
            <Fragment>
                <Navigation
                    handleChange={e => this.handler(e, 'change')}
                    handleClick={e => this.handler(e, 'click')}
                    show={true}
                />
                <Notification notification={this.state.notifications} />
                <Frame>
                    <Resource
                        path={`/api/v1/documents?filter=${this.state.filter}`}
                        render={
                            data => {
                                return data.payload.map((val, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <Card
                                                title={val.title}
                                                // body={val.body}
                                                uri={val._id}
                                            />
                                        </Fragment>
                                    )
                                })
                            }
                        }
                    />
                </Frame>
            </Fragment>
        )
    }

};

export default DashboardController;