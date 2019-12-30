import React, { Component } from 'react'
import axios from 'axios'
import Search from '../../components/Search/Search'
import Layout from '../../components/Layout/Layout'

class Home extends Component {
    state = {
        query: '',
        button: true
    }

    handleChange = e => {
        if (e.target.value !== '') {
            this.setState({ query: e.target.value, button: false })
        }
    }

    search = () => {
        axios.post('/api/v1/search', {
            query: this.state.query
        }).then(res => {
            console.log(res.data)
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <Layout>
                <Search
                    submit={this.search}
                    value={this.state.value}
                    show={this.state.button}
                    query={e => this.handleChange(e)}
                />
            </Layout>
        )
    }
}

export default Home