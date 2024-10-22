import * as esbuild from "esbuild-wasm";
import { createRoot } from "react-dom/client";
import { useState, useEffect, useRef } from "react";

import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App = () => {
  const [input, setInput] = useState<string>(
    `import ReactDom from 'react-dom';
console.log(ReactDom);`
  );
  const ref = useRef<any>();
  const iframe = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }
    iframe.current.srcdoc = html;
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
  };
  const html = `
<html>
<head>
</head>
<body>
  <div id="root"></div>
  <script>
    window.addEventListener("message", (event) => {
      try { 
        eval(event.data);
        } catch (error) {
        const root = document.getElementById("root");
        root.innerHTML = '<div style="color :red;"><h4>Runtime Error</h4>' + error + '</div>';
        console.error(error);
      }   
    }, false);
  </script>
</body>
</html>
`;

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        title="preview"
        srcDoc={html}
        ref={iframe}
        sandbox="allow-scripts"
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
