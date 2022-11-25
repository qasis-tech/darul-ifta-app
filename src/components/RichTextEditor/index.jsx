import React, { useMemo, useRef, useState } from "react";

const TextEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  console.log("content", content);

  return <div>01</div>;
};

export default TextEditor;
