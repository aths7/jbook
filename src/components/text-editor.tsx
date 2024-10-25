import MDEditor from "@uiw/react-md-editor";
import React, { useState, useEffect, useRef } from "react";
import "./text-editor.css";

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [editorInput, setEditorInput] = useState("# Header");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      } else {
        setEditing(false);
      }
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div
        ref={ref}
        className="text-editor"
      >
        <MDEditor
          value={editorInput}
          onChange={(e) => setEditorInput(e || "")}
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setEditing(true)}
      className="text-editor card"
    >
      <div className="card-content">
        <MDEditor.Markdown source={editorInput} />
      </div>
    </div>
  );
};

export default TextEditor;
