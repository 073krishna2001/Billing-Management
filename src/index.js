import React from "react";
import ReactDOM from "react-dom/client"; // Use the 'react-dom/client' import
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./styles/index.css";

// Create a root using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
