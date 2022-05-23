/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import User from "layouts/User.js";
import Login from "views/Login";
import Logout from "views/Login/logout";
import Signup from "views/Signup";
import AuthWrapper from "views/Login/wrapper"
import "assets/css/material-dashboard-react.css?v=1.9.0";
import App from "App";

const hist = createBrowserHistory();

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);




// if (user) {
//   // User is signed in, see docs for a list of available properties
//   // https://firebase.google.com/docs/reference/js/firebase.User
//   // ...
// } else {
//   // No user is signed in.
// }

