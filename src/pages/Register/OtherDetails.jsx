import classNames from 'classnames';
import ErrorMessage from 'components/ErrorMessage';
import paths from 'pages/Router/paths';
import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import firebase from "firebase.js";
import 'firebase/auth';
import { createUser, modifyUser } from 'state/actions/users';
import { register } from 'serviceWorker';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const OtherDetails = () => {
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
    const [location, setLocation] = useState("")
    const [name, setName] = useState("")
    const redirect = isAuth && <Redirect to={paths.ROOT} />;
    const { id } = useParams()
    const newUser = {
        isAdmin: false,
        name,location,id,createdAt:new Date().toDateString()
    }
    const history = useHistory();
    const registerComplete = async () => {
            await dispatch(await modifyUser(newUser));
            history.push(paths.ROOT)
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
                                        <p className="label">Name</p>
                                        <div className="control is-clearfix">
                                            <input
                                                className={classNames('input')}
                                                name="name"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <p className="label">Location</p>
                                        <div className="control is-clearfix">
                                            <input
                                                className={classNames('input')}
                                                name="location"
                                                value={pass}
                                                onChange={e => setPass(e.target.value)}
                                                placeholder="Enter your Location"
                                                type="text"
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
                                                onClick={registerComplete}
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

export default OtherDetails;