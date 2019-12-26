import React, { Component } from 'react'
import { getJwt } from '../../helpers/jwt'
import Register from '../../components/Register/Register.component'
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
        const isAuth = getJwt()

        return isAuth ? this.props.history.push('/login') : console.log('... =>')
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
                this.props.history.push('/')
            }).catch(err => console.log(err))
        }
    }

    render() {
        return (
            <Register 
                submit={e => this.submit(e)}
                name={this.state.name}
                change={e => this.change(e)}
                email={this.state.email}
                password={this.state.password}
            />
        )
    }
}

export default Signup