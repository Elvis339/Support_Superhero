import React, { Fragment, Component } from 'react'
import Search from '../../components/Search/Search';
import Resource from '../Resource/Resource';
import Card from '../../components/Layout/Cards/Cards';
import Frame from '../../components/Layout/Frame/Frame';
import axios from 'axios';

class SearchController extends Component {
    constructor(props) {
        super(props)
        this.handleChange.bind(this)
    }

    state = {
        search: null,
    }

    handleChange(e) {
        e.preventDefault()
        return this.setState({
            search: e.target.value.toLowerCase()
        })
    }

    render() {
        return (
            <Fragment>
                <Search
                    state={this.state.search}
                    handleChange={e => this.handleChange(e)}
                />
                <Frame>
                    <Resource
                        path={`/api/v1/documents/search?title=${this.state.search}`}
                        render={
                            data => {
                                return data.payload.map((val, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <Card
                                                title={val._source.title}
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
}

export default SearchController;