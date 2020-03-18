import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { AuthProvider } from "../src/context/index";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
