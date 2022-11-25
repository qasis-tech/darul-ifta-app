import React, { useMemo, useRef, useState } from "react";
import JoditEditor, { Jodit } from "jodit-react";

const TextEditor = ({ content, setContent, placeholder }) => {
  const editor = useRef(null);

  const config = {
    autofocus: true,
    removeButtons: [
      "copyformat",
      "brush",
      "table",
      "eraser",
      "font",
      "selectall",
      "fontsize",
    ],
    uploader: {
      insertImageAsBase64URI: true,
    },
    placeholder: placeholder ? placeholder : "Start typings...",
    minHeight: 450,
  };
  console.log("content 007", content);

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => setContent(newContent)}
    />
  );
};

export default TextEditor;
