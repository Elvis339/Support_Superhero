import React, { Component, Fragment } from 'react';
import ReactQuill from 'react-quill';
class Editor extends Component {
  constructor(props) {
    super(props)
    this.quillRef = null;      // Quill instance
    this.reactQuillRef = null; // ReactQuill component
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

  render() {
    return (
      <Fragment>
        <ReactQuill
          placeholder="Make support life easier. 🥰"
          modules={this.modules}
          ref={(el) => { this.reactQuillRef = el }}
          theme={'snow'}
          // value={this.props.value}
          onChange={this.props.body}
        />
      </Fragment>
    )
  }
}

export default Editor;