import React, { Fragment, Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Search from '../../components/Search/Search';
import Resource from '../Resource/Resource';
import Collapsible from '../../controllers/LayoutController/Collapsible/Collapsible';
import { Card, Container, Badge } from 'react-bootstrap'

class SearchController extends Component {
    constructor(props) {
        super(props)
        this.handleChange.bind(this)
    }

    state = {
        search: '',
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
                <Resource
                    path={`/api/v1/documents/search?q=${this.state.search}`}
                    render={
                        data => {
                            return data.payload.map((val, index) => {
                                return (
                                    <Fragment key={index}>
                                        <Container className='my-3'>
                                            <Card body>
                                                <a href={`/document/${val._source.docId}`} className="mx-auto mt-1 btn btn-primary">Visit</a>
                                                <Collapsible
                                                    title={val._source.title}
                                                >
                                                    {ReactHtmlParser(val._source.body)}
                                                </Collapsible>
                                            </Card>
                                        </Container>
                                    </Fragment>
                                )
                            })
                        }
                    }
                />
            </Fragment>
        )
    }
}

export default SearchController;