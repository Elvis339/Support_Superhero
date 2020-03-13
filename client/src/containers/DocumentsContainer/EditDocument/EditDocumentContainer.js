import React, { Component, Fragment } from 'react';
import Editor from '../../EditorContainer/EditorContainer';
import axios from 'axios';
// import Editor from '../AddDocument/AddDocumentContainer';

import { getJwt } from '../../../helpers/jwt';

class EditContainer extends Component {
    constructor(props) {
        super(props);

        this.handleChangeInEditor.bind(this);
    }

    state = {
        document: null,
        body: ''
    };

    handleChangeInEditor(value) {
        this.setState({
            body: value,
        })
    }

    async componentWillMount() {
        try {
            const ID_URI = this.props.location.pathname.split('/')[3];
            const res = await axios.get(`/api/v1/document?id=${ID_URI}`, { headers: { "Authorization": `Bearer: ${getJwt()}` } })
            this.setState({ document: res.data });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const body = this.state.document === null ? "Loading..." : this.state.document.body
        return (
            <Fragment>
                <Editor 
                    body={value => this.handleChangeInEditor(value)} 
                    value={body}
                />
            </Fragment>
        )
    }
}

export default EditContainer;