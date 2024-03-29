import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Login from 'pages/Login';
import Home from 'pages/Home';
import Users from 'pages/Users';
import Profile from 'pages/Profile';
import ResetPassword from 'pages/ResetPassword';
import NotFound from 'pages/NotFound';
import User from 'pages/User';
import Section from 'pages/Section';
import Submenu from 'pages/Submenu';
import Register from 'pages/Register/Register';
import VisitorPassRequest from 'pages/VisitorPassRequest/VisitorPassRequest';
import paths from './paths';
import PrivateRoute from './PrivateRoute';
import OtherDetails from 'pages/Register/OtherDetails';

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={paths.LOGIN} component={Login} />
        <Route exact path={paths.REGISTER} component={Register} />
        <Route exact path={paths.COMPLETE_REGISTER} component={OtherDetails} />
        <Route exact path={paths.RESET_PASSWORD} component={ResetPassword} />
        <PrivateRoute path={paths.ADD_USER} component={User} />
        <PrivateRoute path={paths.MODIFY_USER} component={User} />
        <PrivateRoute path={paths.USERS} component={Users} />
        <PrivateRoute path={paths.PROFILE} component={Profile} />
        <PrivateRoute path={paths.SECTION} component={Section} />
        <PrivateRoute path={paths.SUBMENU_1} component={Submenu} />
        <PrivateRoute path={paths.SUBMENU_2} component={Submenu} />
        <PrivateRoute path={paths.VISITOR_PASS_REQUESTED} component={VisitorPassRequest} />
        <PrivateRoute path={paths.ROOT} component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default RouterComponent;
