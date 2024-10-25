import React, { useEffect, useRef } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
}

const html = `
<html>
<head>
<style> html {background-color: white; }</style>
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

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.onload = () => {
      iframe.current.contentWindow.postMessage(code, "*");
    };
  }, [code]);

  return (
    <div className="iframe-wrapper">
      <iframe
        style={{ backgroundColor: "white" }}
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;