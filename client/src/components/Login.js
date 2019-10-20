import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }

        this.change = this.change.bind(this)
        this.submit = this.submit.bind(this)
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async submit(e) {
        e.preventDefault()

        axios.post('/api/v1/login', {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            localStorage.setItem('token', res.data.token)
            this.props.history.push('/home')
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <form onSubmit={e => this.submit(e)}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={e => this.change(e)} value={this.state.email} />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={e => this.change(e)} value={this.state.password} />

                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Login