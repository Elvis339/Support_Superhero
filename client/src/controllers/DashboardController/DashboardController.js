import React, { Component, Fragment } from 'react';
import Navigation from '../../components/Layout/Navigation/Navigation';
import Frame from '../../components/Layout/Frame/Frame';
import Card from '../../components/Layout/Cards/Cards';
import Resource from '../Resource/Resource';

import io from 'socket.io-client';

class DashboardController extends Component {
    constructor(props) {
        super(props)
        this.handler.bind(this);
    };

    state = {
        filter: 'all',
        search: '',
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

    render() {
        let notif = io('http://localhost:3001/socket/notification')
        notif.on('connect',  () => {
            notif.emit('jao majko')
        })
        return (
            <Fragment>
                <Navigation
                    handleChange={e => this.handler(e, 'change')}
                    handleClick={e => this.handler(e, 'click')}
                    show={true}
                />
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