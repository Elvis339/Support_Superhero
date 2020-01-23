import React, { Component, Fragment } from 'react';
import Navigation from '../../components/Layout/Navigation/Navigation';
import Frame from '../../components/Layout/Frame/Frame';
import Alert from '../../components/Layout/Alerts/Alerts';
import Spinner from '../../components/Layout/Spinner/Spinner';
import Resource from '../Resource/Resource';


import Collapsable from '../LayoutController/Collapsible/Collapsible'

class ActiveCollabController extends Component {
    constructor(props) {
        super(props)
        this.handler.bind(this);
    };

    state = {
        path: '/api/v1/activecollab/task-lists',
        search: '',
        open: false
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
        return (
            <Fragment>
                <Navigation
                    handleChange={e => this.handler(e, 'change')}
                    handleClick={e => this.handler(e, 'click')}
                />
                <Frame>
                    <div className='mx-auto my-3'>
                        <h1 className='text-center'>
                            Task lists
                        </h1>
                        <Resource
                            path={this.state.path}
                            render={
                                data => {
                                    if (data.error) {
                                        return <Alert variant='danger' title='Ooops, network tab has more info.' />
                                    } else if (data.loading === true) {
                                        return <Spinner animation='grow' size='lg' centered={true} />
                                    } else if (typeof (data.payload) !== "undefined") {
                                        return data.payload.map((val, index) => {
                                            return (
                                                <Fragment key={val.id}>
                                                    <Collapsable title={val.name}>
                                                        test
                                                    </Collapsable>
                                                </Fragment>
                                            )
                                        })
                                    }
                                }
                            }
                        />
                    </div>
                </Frame>
            </Fragment>
        )
    }

};

export default ActiveCollabController;