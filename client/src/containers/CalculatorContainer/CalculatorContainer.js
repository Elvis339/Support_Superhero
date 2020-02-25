import React, { Component, Fragment } from 'react';
import Calculator from '../../components/Calculator/Calculator';

class CalculatorContainer extends Component {
    constructor(props) {
        super(props)
        this.handleChange.bind(this)
        this.calculate.bind(this)
        this.hasMoreUsers.bind(this)
        this.legacyCalculator.bind(this)
        this.perSeatCalculator.bind(this)
    }

    state = {
        pricing: 'legacy',
        subscription: 'monthly',
        users: 0,
        result: null,
        description: ''
    }

    handleChange(e) {
        e.preventDefault()
        return this.setState({
            [e.target.name]: e.target.value.toLowerCase()
        })
    }

    /**
     * @description Has more than 15 users
     * @returns True if condition is satisfied
     */
    hasMoreUsers() {
        return parseInt(this.state.users) >= 16 ? true : false
    }

    legacyCalculator() {
        const PRICING = this.state.pricing
        const SUBSCRIPTION = this.state.subscription
        const USERS = parseInt(this.state.users)

        if (PRICING === 'legacy') {
            if (SUBSCRIPTION === 'monthly') {
                if (this.hasMoreUsers()) {
                    return this.setState({
                        result: (USERS * (7 + 4)) * 0.5,
                        description: `Bundle: On -- Monthly Payment -- Legacy -- More than 15 users`,
                    })
                } else {
                    this.setState({
                        result: (USERS * (7 + 4)) * 0.6,
                        description: `Bundle: On -- Monthly Payment -- Legacy -- Less than 15 users`,
                    })
                }
            } else {
                if (this.hasMoreUsers()) {
                    this.setState({
                        result: ((USERS * (6.25 + 3)) * 0.6) * 12,
                        description: `Bundle: On -- Yearly Payment -- Legacy -- More than 15 users`,
                    })
                } else {
                    this.setState({
                        result: ((USERS * (6.25 + 3)) * 0.5) * 12,
                        description: `Bundle: On -- Yearly Payment -- Legacy -- Less than 15 users`,
                    })
                }
            }
        }
    }

    perSeatCalculator() {
        const PRICING = this.state.pricing
        const SUBSCRIPTION = this.state.subscription
        const USERS = parseInt(this.state.users)

        const MONTHLY_RATE = USERS * (7.00 + 4.00)
        const YEARLY_RATE = USERS * (6.25 + 3.00)

        if (PRICING === 'per seat') {
            if (SUBSCRIPTION === 'monthly') {
                return this.setState({ 
                    result: MONTHLY_RATE,
                    description: `Bundle: On -- Monthly Payment -- Per Seat`,
                })
            } else {
                return this.setState({ 
                    result: YEARLY_RATE,
                    description: `Bundle: On -- Yearly Payment -- Per Seat`,
                })
            }
        }
    }

    calculate() {
        const PRICING = this.state.pricing
        if (parseInt(this.state.users) === 0 || this.state.users === "") {
            return alert('Please enter user amount')
        } else {
            switch (PRICING) {
                case "legacy":
                    this.legacyCalculator()
                    break
                default:
                    this.perSeatCalculator()
                    break;
            }
        }
    }

    render() {
        return (
            <Fragment>
                <Calculator
                    handleChange={e => this.handleChange(e)}
                    calculate={() => this.calculate()}
                    result={this.state.result}
                    description={this.state.description}
                />
            </Fragment>
        )
    }
}

export default CalculatorContainer;