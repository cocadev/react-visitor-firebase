import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { appAuth, realTimeDatabase } from '../firebase'
import { setData } from '../firebase/setData'

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [CPassword, setCPassword] = useState("")
  const navigate = useNavigate();
  const register = async () => {
    if (password == CPassword) {
      try {
        // const res = await createUserWithEmailAndPassword(appAuth, email, password);

        const res = await createUserWithEmailAndPassword(appAuth, email, password)
        // .then((userCredential) => {
        //   // Signed in 
        //   const user = userCredential.user;
      
        //   sendEmailVerification(user)
        //     .then(() => {
        //       // Email verification sent!
        //       alert("email")
        //       // let msg = 'An email verification link has been sent to ' + user.email;
        //       // document.querySelector('.success.email_msg').innerHTML=msg;
        //     }).catch(err => {
        //       alert(err.message)
        //     });
        // })
    

        console.log(res.user)
        const data = {
          uid: res.user.uid,
          name: email.split('@')[0] ? email.split('@')[0].split('.')[0] : email.split('@')[0],
          authProvider: "google",
          email: res.user.email,
          createdAt: new Date().toDateString(),
          location: "",
          isAdmin: false
        }
        await setData(`users/${res.user.uid}`, data)
        localStorage.setItem("uid",res.user.uid);
        toast.success('Register Successfully')
        navigate(`/register/${res.user.uid}`);
      } catch (err) {
        toast.error(err.message)
      }
    } else {
      toast.error("Password dose not match")
    }
  }
  const { isLogin } = useSelector(state => state.account)
  // useEffect(() => {
  //   if (isLogin) {
  //     navigate('/')
  //   }
  // }, [isLogin])
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
                  <h4>New here?</h4>
                  <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                  <div className="pt-3">

                    <div className="form-group">
                      <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Confirm Password" value={CPassword} onChange={e => setCPassword(e.target.value)} />
                    </div>
                    <div className="mt-3">
                      <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={register}>SIGN UP</button>
                    </div>
                    <div className="text-center mt-4 font-weight-light">
                      Already have an account? <Link to="/login" className="text-primary">Login</Link>
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
    </>




  )
}

export default Register