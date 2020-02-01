import React, { Component } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import EditorComponent from '../../components/Editor/Editor';

import { getJwt } from '../../helpers/jwt';

class Editor extends Component {
  constructor(props) {
    super(props)
    this.quillRef = null;      // Quill instance
    this.reactQuillRef = null; // ReactQuill component
    this.handleChange.bind(this)
    this.handleForm.bind(this);

    this.state = {
      text: '',
      title: '',
      category: '',
      error: null
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

  saveToDB = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/documents',
        {
          title: this.state.title == '' ? Error('Empty!') : this.state.title,
          category: this.state.category,
          body: this.state.text == '' ? Error('Empty!') : this.state.text,
          created_by: window.localStorage.getItem('created_by'),
        },
        { headers: { "Authorization": `Bearer: ${getJwt()}` } }
      )
    } catch (error) {
      this.setState({
        error
      })
    }
  }

  handleChange(value) {
    this.setState({
      text: value,
    })
  }

  handleForm(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <EditorComponent
        saveToDB={e => this.saveToDB(e)}
        change={e => this.handleForm(e)}
      >
        <ReactQuill
          placeholder="Make support life easier. 🥰"
          modules={this.modules}
          ref={(el) => { this.reactQuillRef = el }}
          theme={'snow'}
          onChange={value => this.handleChange(value)}
        />
        <hr />
        <h3 className='text-center my-2'>Live preview...</h3>
        <div dangerouslySetInnerHTML={{ __html: this.state.text }}></div>
      </EditorComponent>
    )
  }
}

export default Editor;

// const 
// editor = this.reactQuillRef.getEditor(),
// unprivilegedEditor = this.reactQuillRef.makeUnprivilegedEditor(editor);

// console.log(unprivilegedEditor.getHTML())