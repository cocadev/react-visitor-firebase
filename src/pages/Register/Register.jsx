import classNames from 'classnames';
import ErrorMessage from 'components/ErrorMessage';
import paths from 'pages/Router/paths';
import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Redirect,useHistory } from 'react-router-dom';
import firebase from "firebase.js";
import 'firebase/auth';
import { createUser } from 'state/actions/users';
const Register = () => {
    const { isAuth, loading, locale } = useSelector(
        (state) => ({
            error: state.auth.error,
            isAuth: !!state.auth.userData.id,
            loading: state.auth.loading,
            locale: state.preferences.locale,
        }),
        shallowEqual
    );
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [Cpass, setCPass] = useState("");
    const history = useHistory()
    const redirect = isAuth && <Redirect to={paths.ROOT} />;

    const newUser = {
        name:email.split('@')[0]?.split('.')[0],
        location:"",
        createdAt: new Date().toDateString(),
        isAdmin: false,
        email, password: pass
    }
    const registerWithEmailAndPassword = async () => {
        if (pass == Cpass) {
            const id = await dispatch(await createUser(newUser));
            history.push(`/register/${id}`)
        } else {
            window.alert("Password done not match")
        }
    }
    return (
        <section className="section hero is-fullheight is-error-section">
            {redirect}
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-two-fifths">
                            <div className="card has-card-header-background">
                                <header className="card-header">
                                    <p className="card-header-title">
                                        <span className="icon">
                                            <i className="mdi mdi-lock default" />
                                        </span>
                                        <span>Register</span>
                                    </p>
                                </header>
                                <div className="card-content">
                                    <div className="field">
                                        <p className="label">Email</p>
                                        <div className="control is-clearfix">
                                            <input
                                                className={classNames('input')}
                                                name="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                placeholder="Enter your email address"
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <p className="label">Password</p>
                                        <div className="control is-clearfix">
                                            <input
                                                className={classNames('input')}
                                                name="password"
                                                value={pass}
                                                onChange={e => setPass(e.target.value)}
                                                placeholder="Enter your Password"
                                                type="password"
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <p className="label">Confirm Password</p>
                                        <div className="control is-clearfix">
                                            <input
                                                type="password"
                                                className={classNames('input')}
                                                name="password"
                                                value={Cpass}
                                                placeholder="Confirm Password"
                                                onChange={e => setCPass(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="field is-grouped">
                                        <div className="control">
                                            <button
                                                type="submit"
                                                className={classNames('button', 'is-black', {
                                                    'is-loading': loading,
                                                })}
                                                onClick={registerWithEmailAndPassword}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;