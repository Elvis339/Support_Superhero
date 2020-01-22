import React, { Component, Fragment } from 'react';
import Navigation from '../../components/Layout/Navigation/Navigation';
import Frame from '../../components/Layout/Frame/Frame';
import Card from '../../components/Layout/Cards/Cards';
import Alert from '../../components/Layout/Alerts/Alerts';
import Spinner from '../../components/Layout/Spinner/Spinner';
import Resource from '../Resource/Resource';


import Collapsable from '../LayoutController/Collapsible/Collapsible'

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
        if (param == 'click') {
            return this.setState({
                [e.target.name]: String(e.target.textContent).toLocaleLowerCase()
            })
        }
        return this.setState({
            [e.target.name]: String(e.target.value).toLocaleLowerCase()
        })
    };

    render() {
        return (
            <Fragment>
                <Navigation
                    handleChange={e => this.handler(e, 'change')}
                    handleClick={e => this.handler(e, 'click')}
                />
                <Frame>
                    <Resource
                        path={`/api/v1/activecollab/task-lists`}
                        render={
                            data => {
                                if (data.error) {
                                    return <Alert variant='danger' title='Ooops, network tab has more info.' />
                                } else if (data.loading === true) {
                                    return <Spinner animation='grow' size='lg' centered={true} />
                                } else if (typeof (data.payload) !== "undefined") {
                                    return data.payload.map((val, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <Collapsable title={val.name}>
                                                    {val.open_tasks}
                                                </Collapsable>
                                            </Fragment>
                                        )
                                    })
                                }
                            }
                        }
                    />
                </Frame>
            </Fragment>
        )
    }

};

export default DashboardController;