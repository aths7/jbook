import { createRoot } from "react-dom/client";
// CSS Theme
import "bulmaswatch/superhero/bulmaswatch.min.css";
// import "bulmaswatch/cerulean/bulmaswatch.min.css";

// import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";

const App = () => {
  return (
    <div>
      {/* <CodeCell /> */}
      <TextEditor />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
