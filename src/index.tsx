import React from 'react';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// CSS Theme
// import "bulmaswatch/superhero/bulmaswatch.min.css";
import "bulmaswatch/journal/bulmaswatch.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Provider } from "react-redux";
import { store } from "./state";

import CellList from "./components/cell-list";
import HomePage from "./components/home-page";

const router = createBrowserRouter([
  {
    path: '/editor',
    element: <CellList />
  },
  {
    path: '/',
    element: <HomePage />
  }
])


const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
