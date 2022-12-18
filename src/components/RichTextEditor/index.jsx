import React, { useMemo, useRef, useState } from "react";
import JoditEditor, { Jodit } from "jodit-react";

const TextEditor = ({ content, setContent, placeholder }) => {
  const editor = useRef(null);


  const config = useMemo(() => ({
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
    placeholder: placeholder || "Start typings...",
    minHeight: 450,
    editHTMLDocumentMode: true,
    beautifyHTML: true,
    hidePoweredByJodit: true,
    imageProcessor: {
      replaceDataURIToBlobIdInView: true
    },
    mediaInFakeBlock: false,
    processPasteHTML: true
    // cleanHTML: {
    //   removeEmptyElements: true,
    //   fillEmptyParagraph: false,
    // },
  }),
    [placeholder]
  );




  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      // tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => { }}
    />
  );

};

export default TextEditor;
