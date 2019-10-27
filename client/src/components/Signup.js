import React, { Component } from 'react'
import axios from 'axios'

class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: ''
        }

        this.change = this.change.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentDidMount() {
        if (window.localStorage.getItem('token')) {
            this.props.history.push('/login')
        }
    }

    validate() {
        if (this.state.name === '' || this.state.email === '' || this.state.password === '') {
            alert('Fields are empty!')
            return false
        }
        return true
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async submit(e) {
        e.preventDefault()

        if (this.validate()) {
            axios.post('/api/v1/users', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }).then(res => {
                localStorage.setItem('token', res.data.token)
                this.props.history.push('/home')
            }).catch(err => console.log(err))
        }
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={e => this.submit(e)}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" onChange={e => this.change(e)} value={this.state.name} />

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

export default Signup