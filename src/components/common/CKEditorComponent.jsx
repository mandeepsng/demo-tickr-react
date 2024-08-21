import React, { useState, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorComponent = ({ onChange, clearEditorRef, placeholderr }) => {
  const [editorData, setEditorData] = useState('');
  const [key, setKey] = useState(0); // Key state for forcing re-render

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);

    // Pass the data to the parent component if needed
    if (onChange) {
      onChange(data);
    }
  };

  const clearEditor = () => {
    setEditorData('');
    setKey(prevKey => prevKey + 1); // Increment key to force re-render
  };

  // Expose the clearEditor function through the ref
  if (clearEditorRef) {
    clearEditorRef.current = clearEditor;
  }

  return (
    <CKEditor
      key={key} // Add key prop to force re-render
      editor={ClassicEditor}
      data={editorData}
      onChange={handleEditorChange}
      config={{
        placeholder: placeholderr,
        // Add other configuration options as needed
      }}
      className={`${placeholderr === "Type Your Message" ? "reply-editor" : ""}`}
    />
  );
};

export default CKEditorComponent;
