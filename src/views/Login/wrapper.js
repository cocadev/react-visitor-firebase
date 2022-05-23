import React, { useState, useEffect, Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";

function wrapper(ComposedComponent, history, role){
    class Authentication extends Component {
        componentWillMount() {
            
            if (!localStorage.getItem('token') || !localStorage.getItem('role') || localStorage.getItem('role') != role) {
                history.push('/login');
            }

        }

        componentWillUpdate(nextProps) {
            if (!localStorage.getItem('token') || !localStorage.getItem('role') || localStorage.getItem('role') != role) {
                history.push('/login');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }
    return Authentication;
}
export default wrapper;