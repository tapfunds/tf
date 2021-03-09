import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import store from "./store/index";
import setAuthorizationToken from "./utils/authorization";
import { LOGIN_SUCCESS } from "./store/modules/auth/authTypes";
import { Router } from "react-router-dom";
import { history } from "./utils/history";

//when the page reloads, the auth user is still set
if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
  let userData =
    localStorage.getItem("user_data") == null
      ? null
      : JSON.parse(localStorage.getItem("user_data"));
  store.dispatch({ type: LOGIN_SUCCESS, payload: userData }); //provided he has a valid token
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();