import React, { Component, Fragment } from 'react';
import Navigation from '../../components/Layout/Navigation/Navigation';
import Frame from '../../components/Layout/Frame/Frame';
import Card from '../../components/Layout/Cards/Cards';
import Resource from '../Resource/Resource';

class DashboardController extends Component {
    constructor(props) {
        super(props)
        this.handler.bind(this);
    };

    state = {
        filter: 'all',
    };

    handler(e) {
        return this.setState({
            [e.target.name]: String(e.target.textContent).toLocaleLowerCase()
        })
    };

    render() {
        return (
            <Fragment>
                <Navigation
                    handleClick={e => this.handler(e)}
                    show={true}
                />
                <Frame row={true}>
                    <Resource
                        path={`/api/v1/documents?filter=${this.state.filter}`}
                        render={
                            data => {
                                return data.payload.map((val, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <Card
                                                title={val.title}
                                                uri={`/document/${val._id}`}
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