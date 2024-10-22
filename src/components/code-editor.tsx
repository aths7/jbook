import "./code-editor.css";
import "./syntax.css";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import React, { useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import codeShift from "jscodeshift";
import Highlighter from "monaco-jsx-highlighter";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );

    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const editorRef = useRef<any>(null);

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        tabWidth: 2,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    editorRef.current.getModel().setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        value={initialValue}
        editorDidMount={onEditorDidMount}
        height="500px"
        language="javascript"
        theme="dark"
        options={{
          minimap: {
            enabled: false,
          },
          wordWrap: "on",
          showUnused: false,
          wrappingIndent: "deepIndent",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          readOnly: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;
