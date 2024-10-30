import MDEditor from "@uiw/react-md-editor";
import React, { useState, useEffect, useRef } from "react";
import "./text-editor.css";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { updateCell } = useActions();

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
          value={cell.content}
          onChange={(e) => updateCell(cell.id, e || "")}
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
        <MDEditor.Markdown source={cell.content || "Click to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
