import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router ,Route} from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import {defaultTheme} from "./theme";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      
      <ThemeProvider theme={defaultTheme}>
        <App />
      </ThemeProvider>
  
      
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
