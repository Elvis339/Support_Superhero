import React, { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import ReactionForm from '../../components/Reactions/ReactionForm';
import axios from 'axios';

class Reaction extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit.bind(this)
        this.handleChange.bind(this)
        this.handleReaction.bind(this)
    }

    state = {
        file_id: this.props.URI,
        email: null,
        description: null,
    }

    async handleSubmit(e) {
        e.preventDefault()
        try {
            await axios.post(`/api/v1/reactions?id=${this.state.file_id}`, {
                file_id: this.state.file_id,
                reaction: this.state.reaction,
                description: this.state.description,
                email: this.state.email
            })
        } catch (error) {
            console.error(error)
        }
    }

    handleChange(e) {
        return this.setState({
            [e.target.name]: e.target.value
        })
    };

    async handleReaction(e) {
        const reaction = e.target.textContent.split(' ')[0]
        switch (reaction) {
            case "Yes":
                try {
                    await axios.post(`/api/v1/reactions?id=${this.state.file_id}`, {
                        file_id: this.state.file_id,
                        reaction: 1,
                        description: this.state.description,
                        email: this.state.email
                    })
                } catch (error) {
                    console.error(error)
                }
                break;
            case "No":
                try {
                    await axios.post(`/api/v1/reactions?id=${this.state.file_id}`, {
                        file_id: this.state.file_id,
                        reaction: 0,
                        description: this.state.description,
                        email: this.state.email
                    })
                } catch (error) {
                    console.error(error)
                }
                break;
        }
    }

    render() {
        return (
            <Fragment>
                <h3 className='text-center'>Was this helpful?</h3>
                <Button variant='primary' className='mx-2'
                    onClick={e => this.handleReaction(e)}>Yes 😊</Button>
                <ReactionForm
                    handleSubmit={e => this.handleSubmit(e)}
                    change={e => this.handleChange(e)}
                />
            </Fragment>
        )
    }
}

export default Reaction;