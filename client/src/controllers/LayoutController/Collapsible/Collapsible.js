import React, { Component, Fragment } from 'react'
import './Layout.css'

class Collapsible extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e) {
        this.setState({ open: !this.state.open })
    }

    render() {
        return (
            <Fragment>
                <div className={`header ${this.props.classes}`} onClick={e => this.togglePanel(e)}>
                    {this.props.title}
                </div>
                { this.state.open ? <div className='content'>
                    {this.props.children}
                </div> : null }
            </Fragment>
        )
    }
}


export default Collapsible;