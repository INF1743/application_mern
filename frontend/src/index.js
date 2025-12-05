import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { setAuthToken } from "./services/api";
const root = ReactDOM.createRoot(document.getElementById("root"));


const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
