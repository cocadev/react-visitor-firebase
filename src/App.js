import React from 'react'
import { getAuth } from "firebase/auth";
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

const App = () => {
    const hist = createBrowserHistory();
    return (
        <Router history={hist}>
    <Switch>
      <GuestRoute path="/login" exact={true}><Login /></GuestRoute>
      <SecureRoute path="/admin"><Admin /></SecureRoute>
      <SecureRoute path="/user"><User /></SecureRoute>
      <SecureRoute path="/logout"><Logout /></SecureRoute>
      <GuestRoute path="/signup" exact={true}><Signup /></GuestRoute>
      <Redirect from="/" to="/admin" />
    </Switch>
  </Router>
  )
}

const GuestRoute = ({ children, ...rest }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    return (
        <Route {...rest}
            render={({ location }) => {
                return user ? (
                    <Redirect to={{
                        pathname: '/admin',
                        state: {
                            from: location
                        }
                    }} />
                ) : (children);
            }}>
        </Route>
    )
  }
const SecureRoute = ({ children, ...rest }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    return (
        <Route {...rest}
            render={({ location }) => {
                return !user ? (
                    <Redirect to={{
                        pathname: '/login',
                        state: {
                            from: location
                        }
                    }} />
                ) : (children);
            }}>
        </Route>
    )
  }

export default App