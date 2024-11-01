import React, { useState, useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import { useActions } from "../hooks/use-actions";

import Resizable from "./resizable";
import { Cell } from "../state";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content || `import React from 'react';
import {createRoot } from 'react-dom/client'
const App = () =>{
  return <h1> Hello  !!</h1>
}
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
`}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview
          code={code}
          err={err}
        />
      </div>
    </Resizable>
  );
};

export default CodeCell;
