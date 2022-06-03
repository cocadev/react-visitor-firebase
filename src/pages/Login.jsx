import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { appAuth, realTimeDatabase } from '../firebase'
import toast from 'react-hot-toast'
import { ref, set } from 'firebase/database'
import { useSelector } from 'react-redux'
import { setData } from '../firebase/setData'
// const db = getFirestore(firebaseApp);
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { isLogin } = useSelector(state => state.account)
    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(appAuth, email, password)
            toast.success("Login Successfully")
            localStorage.setItem("uid",user.user.uid);
            navigate('/')
        } catch (err) {
            toast.error("Invalid email or password")
        }
    }
    // useEffect(() => {
    //     if (isLogin) {
    //         navigate('/')
    //     }
    // }, [isLogin])

    const google = async () => {
        const googleProvider = new GoogleAuthProvider();
        try {
            const res = await signInWithPopup(appAuth, googleProvider);
            const user = res.user;
            const data = {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                createdAt: new Date().toDateString(),
                location: "",
                isAdmin: false
            }
            await setData(`users/${user.uid}`, data)
            localStorage.setItem("uid",user.uid);
            toast.success("Login Successfully")
            navigate('/')
        } catch (err) {
            toast.error(err.message);
        }
    }
    return (
        <>

            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                    <div className="brand-logo">
                                        <img src="../../images/logo.svg" alt="logo" />
                                    </div>
                                    <h4>Hello! let's get started</h4>
                                    <h6 className="font-weight-light">Sign in to continue.</h6>
                                    <div className="pt-3">
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={login}>SIGN IN</button>
                                        </div>
                                        <div className="my-2">
                                            <button type="button" className="btn btn-block btn-google auth-form-btn" onClick={google}>
                                                <i className="ti-google mr-2"></i>Continue with Google
                                            </button>
                                        </div>
                                        <div className="text-center mt-4 font-weight-light">
                                            Don't have an account? <Link to="/register" className="text-primary">Register</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- content-wrapper ends --> */}
                </div>
                {/* <!-- page-body-wrapper ends --> */}
            </div>
            {/* <!-- container-scroller --> */}


        </>


    )
}

export default Login