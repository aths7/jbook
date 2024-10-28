import { createRoot } from "react-dom/client";
// CSS Theme
import "bulmaswatch/superhero/bulmaswatch.min.css";
// import "bulmaswatch/cerulean/bulmaswatch.min.css";

import { Provider } from "react-redux";
import { store } from "./state";

// import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        <TextEditor />
      </div>
    </Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
