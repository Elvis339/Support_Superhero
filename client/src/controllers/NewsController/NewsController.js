import React, { Component, Fragment } from 'react';
import Resource from '../Resource/Resource';
import NewsMessage from '../../components/News/Layout/NewsInfo/NewsInfo';

import ActivityHeader from '../../components/News/Layout/Header/ActivityHeader';

import { Container } from 'react-bootstrap';

class NewsController extends Component {
    constructor(props) {
        super(props)

        this.dateHandler.bind(this)
    }

    state = {
        date: null,
        path: `/api/v1/news/today`
    }

    dateHandler(e) {
        this.setState({
            date: e.target.value,
            path: `/api/v1/news/today/${e.target.value}`
        })
    }

    render() {
        return (
            <Fragment>
                <ActivityHeader
                    changeDate={e => this.dateHandler(e)}
                />
                <Container className='my-5'>
                    <Resource
                        path={this.state.path}
                        render={
                            data => {
                                return data.payload.map((val, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <NewsMessage
                                                created_by={val.created_by}
                                                body={val.body}
                                                timestamp={val.createdAt}
                                            />
                                        </Fragment>
                                    )
                                })
                            }
                        }
                    />
                </Container>
            </Fragment>
        )
    }
}

export default NewsController;