import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { Container, Button } from 'react-bootstrap';

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
      
      saveHtml = () => {
        const 
            editor = this.reactQuillRef.getEditor(),
            unprivilegedEditor = this.reactQuillRef.makeUnprivilegedEditor(editor);

        console.log(unprivilegedEditor.getHTML())
      }

      modules = {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['blockquote', 'code-block'],
          ['bold', 'italic', 'underline','strike'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['clean']
        ],
      }
      
      render() {
        return (
          <Container>
            <ReactQuill
                modules={this.modules}
                ref={(el) => { this.reactQuillRef = el }}
                theme={'snow'} />
            <Button variant='light' onClick={this.saveHtml}>Save</Button>
          </Container>
        )
      }
}

export default Editor;