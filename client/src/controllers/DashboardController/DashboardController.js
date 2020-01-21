import React, { Component } from 'react';
import Aux from '../../components/Hoc/Aux';
import Navigation from '../../components/Layout/Navigation/Navigation';
import Dashboard from '../../components/Dashboard/Dashboard';
import Resource from '../Resource/Resource';

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
            this.setState({
                [e.target.name]: String(e.target.textContent).toLocaleLowerCase()
            })
        } else {
            this.setState({
                [e.target.name]: String(e.target.value).toLocaleLowerCase()
            })
        }
    };

    render() {
        return (
            <Aux>
                <Navigation
                    handleChange={e => this.handler(e, 'change')}
                    handleClick={e => this.handler(e, 'click')}
                />
                {/* TODO: treba da renderuje u zavisnosti od filtera, sto znaci da ako je filter shepherd onda da ode u bazu i nadje sve sto matchuje. */}
                <Resource
                    path={`/api/v1/documents?filter=${this.state.filter}`}
                    render={
                        data => {
                            if (typeof (data.payload) !== "undefined") {
                                return data.payload.map((val, index) => {
                                    return (
                                        <Aux key={index}>
                                            Hello
                                        </Aux>
                                    )
                                })
                            }
                            return <p>Loading...</p>
                        }
                    }
                />
            </Aux>
        )
    }

};

export default DashboardController;