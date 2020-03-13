import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Editor from '../../EditorContainer/EditorContainer';
import FormDocument from '../../../components/Document/FormDocument';
import CenterHorizontaly from '../../../components/Layout/CenterHorizontaly/CenterHorizontaly';
import { Alert, ProgressBar } from 'react-bootstrap';

import { getJwt } from '../../../helpers/jwt';

class AddDocumentContainer extends Component {
    constructor(props) {
        super(props)
        this.handleChangeInForm.bind(this);
        this.onFileChange.bind(this);
        this.handleChangeInEditor.bind(this);

        this.state = {
            body: '',
            title: '',
            category: '',
            hasFiles: 0,
            sharable_files: {},
            error: null,
            status: null,
            percent: 0,
        }
    }

    resetState() {
        return this.setState({
            text: '',
            title: '',
            hasFiles: 0,
            sharable_files: {},
            error: null,
            status: "Document added! 🚀",
            percent: 0,
        })
    }

    saveToDB = async e => {
        e.preventDefault()
        try {
            let formData = new FormData()
            formData.append('title', this.state.title === '' ? Error('Empty!') : this.state.title)
            formData.append('body', this.state.body === '' ? Error('Empty!') : this.state.body)
            formData.append('category', this.state.category)
            formData.append('hasFiles', this.state.hasFiles)
            formData.append('sharable_files', this.state.sharable_files)
            formData.append('created_by', window.localStorage.getItem('created_by'))

            let res = await axios.post('/api/v1/documents', formData, {
                headers: {
                    "Authorization": `Bearer: ${getJwt()}`,
                },
                onUploadProgress: progressEvent => {
                    const { lengthComputable, loaded, total } = progressEvent;
                    if (lengthComputable) {
                        return this.setState({
                            percent: (100 * loaded / total),
                        });
                    };
                    return
                },
            });

            if (res.status === 201) return this.resetState()
        } catch (error) {
            this.setState({
                error
            })
        }
    }

    handleChangeInForm(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onFileChange(e) {
        this.setState({
            hasFiles: this.state.hasFiles === 0 ? 1 : 0,
            sharable_files: e.target.files[0]
        })
    }

    handleChangeInEditor(value) {
        this.setState({
            body: value,
        })
    }

    render() {
        return (
            <FormDocument
                saveToDB={e => this.saveToDB(e)}
                change={e => this.handleChangeInForm(e)}
                onFileChange={e => this.onFileChange(e)}
            >
                <ProgressBar className='mb-2' now={this.state.percent} label={`${this.state.percent}%`} />
                <Editor body={value => this.handleChangeInEditor(value)} />
                <hr />
                <h3 className='text-center my-2'>Live preview...</h3>
                <div dangerouslySetInnerHTML={{ __html: this.state.body }}></div>
                {this.state.error ? 
                <Fragment>
                    <Alert variant='danger'>Network tab has more info...</Alert>
                    <CenterHorizontaly>
                        <img src='/assets/error_gabriel.png' /><br />
                    </CenterHorizontaly>
                </Fragment> : null}
                {this.state.status ? <Alert variant='success'>{this.state.status}</Alert> : null}
            </FormDocument>
        )
    }
}

export default AddDocumentContainer;