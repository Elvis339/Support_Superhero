import React, { Component, Fragment } from 'react';
import Navigation from '../../components/Layout/Navigation/Navigation';
import Frame from '../../components/Layout/Frame/Frame';
import Sidebar from '../../components/Layout/Sidebar/Sidebar'
import Alert from '../../components/Layout/Alerts/Alerts';
import Spinner from '../../components/Layout/Spinner/Spinner';
import Collapsable from '../LayoutController/Collapsible/Collapsible';
import { Card, Badge } from 'react-bootstrap'

import axios from 'axios'
import { getJwt } from '../../helpers/jwt';
import ReactHtmlParser from 'react-html-parser';

import './cx-0.css'

class ActiveCollabController extends Component {
    constructor(props) {
        super(props)
        this.handler.bind(this);
        this.getTasks.bind(this);
    };

    state = {
        task_lists: [],
        tasks: [],
        error: null,
        loading: true,
        _show: []
    };

    async componentDidMount() {
        try {
            let task_lists = await axios.get('/api/v1/activecollab/task-lists', {
                headers: { "Authorization": `Bearer: ${getJwt()}` }
            })
            let tasks = await axios.get(`/api/v1/activecollab`, {
                headers: { "Authorization": `Bearer: ${getJwt()}` }
            })
            this.setState({
                loading: false,
                task_lists: task_lists.data,
                tasks: tasks.data,
            })
        } catch (error) {
            this.setState({
                error
            })
        }
    }


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

    async getTasks(e) {
        let task_list_id = e.target.dataset.id;

        let tasks = this.state.tasks.filter(task => task.task_list_id === parseInt(task_list_id))

        return this.setState({ _show: tasks })
    }

    render() {
        let
            loading = this.state.loading ? <Spinner animation='grow' size='lg' centered={true} /> : null,
            task_list_name = this.state.task_lists.map((list, index) => (
                <li key={index} className='list-group-item btn' data-id={list.id} onClick={e => this.getTasks(e)}>
                    {list.name}
                </li>
            ));

        return (
            <Fragment>
                <Navigation
                    handleChange={e => this.handler(e, 'change')}
                    handleClick={e => this.handler(e, 'click')}
                />
                {loading}
                {this.state.error ? <Alert variant='danger' title='Network tab has more info...' /> : null}
                <Frame>
                    <div className='mx-auto my-3 w-100'>
                        <Sidebar>
                            {task_list_name}
                        </Sidebar>
                    </div>
                </Frame>
                <div className='cx-0'>
                    {this.state._show.length > 1 ? this.state._show.map((val, index) => (
                        <Fragment key={index}>
                            <Card body>
                                <Badge variant='info'>Created by: {val.created_by_name}</Badge>
                                <a target="_blank" rel="noopener noreferrer" href={`https://app.activecollab.com/1${val.url_path}`} class="mx-1 badge badge-success">Visit task</a>
                                <Collapsable
                                    title={val.name}
                                    classes={'text-center'}
                                >
                                    {ReactHtmlParser(val.body)}
                                </Collapsable>
                            </Card>
                        </Fragment>
                    )) : null}
                </div>
            </Fragment>
        )
    }

};

export default ActiveCollabController;