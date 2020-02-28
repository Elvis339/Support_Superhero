import React, { Component } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import Alert from '../../components/Layout/Alerts/Alerts';
import AddDocument from '../../components/Document/AddDocument';

import { getJwt } from '../../helpers/jwt';

class Editor extends Component {
  constructor(props) {
    super(props)
    this.quillRef = null;      // Quill instance
    this.reactQuillRef = null; // ReactQuill component
    this.handleChangeInEditor.bind(this)
    this.handleChangeInForm.bind(this);
    this.onFileChange.bind(this);

    this.state = {
      text: '',
      title: '',
      category: '',
      hasFiles: 0,
      sharable_files: {},
      error: null,
      status: null
    }
  }

  componentDidMount() {
    this.attachQuillRefs()
  }

  componentDidUpdate() {
    this.attachQuillRefs()
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    this.quillRef = this.reactQuillRef.getEditor();
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['blockquote', 'code-block'],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }

  resetState() {
    return this.setState({
      text: '',
      title: '',
      hasFiles: 0,
      sharable_files: {},
      error: null,
      status: "Document added! 🚀"
    })
  }

  saveToDB = async e => {
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append('title', this.state.title === '' ? Error('Empty!') : this.state.title)
      formData.append('body', this.state.text === '' ? Error('Empty!') : this.state.text)
      formData.append('category', this.state.category)
      formData.append('hasFiles', this.state.hasFiles)
      formData.append('sharable_files', this.state.sharable_files)
      formData.append('created_by', window.localStorage.getItem('created_by'))

      let res = await axios.post('/api/v1/documents', formData, {
        headers: {
          "Authorization": `Bearer: ${getJwt()}`,
        }
      })

      if (res.status === 201) return this.resetState()
    } catch (error) {
      this.setState({
        error
      })
    }
  }

  handleChangeInEditor(value) {
    this.setState({
      text: value,
    })
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

  render() {
    return (
      <AddDocument
        saveToDB={e => this.saveToDB(e)}
        change={e => this.handleChangeInForm(e)}
        onFileChange={e => this.onFileChange(e)}
      >
        <ReactQuill
          placeholder="Make support life easier. 🥰"
          modules={this.modules}
          ref={(el) => { this.reactQuillRef = el }}
          theme={'snow'}
          onChange={value => this.handleChangeInEditor(value)}
        />
        <hr />
        <h3 className='text-center my-2'>Live preview...</h3>
        <div dangerouslySetInnerHTML={{ __html: this.state.text }}></div>
        {this.state.error ? <Alert variant='danger' title='Network tab has more info...' /> : null}
        {this.state.status ? <Alert variant='success' title={this.state.status} /> : null}
      </AddDocument>
    )
  }
}

export default Editor;

  // saveToDB = async e => {
  //   e.preventDefault();
  //   try {
  //     let res = await axios.post('/api/v1/documents',
  //       {
  //         title: this.state.title === '' ? Error('Empty!') : this.state.title,
  //         category: this.state.category,
  //         body: this.state.text === '' ? Error('Empty!') : this.state.text,
  //         hasFiles: this.state.hasFiles,
  //         sharable_files: this.state.sharable_files,
  //         created_by: window.localStorage.getItem('created_by'),
  //       },
  //       {
  //         headers: {
  //           "Authorization": `Bearer: ${getJwt()}`,
  //         }
  //       }
  //     )

  //     if (res.status === 201) return this.resetState()
  //     console.log(this.state)
  //   } catch (error) {
  //     this.setState({
  //       error
  //     })
  //   }
  // }