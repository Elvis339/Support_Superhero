import React, { Component } from 'react'
import axios from 'axios'
import LoginComponent from '../../components/Login/Login.component'


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

    validate() {
        if (this.state.email === '' || this.state.password === '') {
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
            axios.post('/api/v1/login', {
                email: this.state.email,
                password: this.state.password
            }).then(res => {
                localStorage.setItem('token', res.data.token)
                this.props.history.push('/')
            }).catch(err => console.log(err))
        }
    }

    render() {
        return (
            <LoginComponent 
                submit={e => this.submit(e)}
                mail={this.state.email}
                change={e => this.change(e)}
                password={this.state.password}
            />
        )
    }
}

export default Login