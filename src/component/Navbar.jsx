import React, { useEffect, useState } from 'react'
import { signOut } from "firebase/auth";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { appAuth } from '../firebase';
import { useSelector } from 'react-redux';
import { loginUser } from '../firebase/getData';
const Navbar = () => {
  const navigate = useNavigate()
  // const {isLogin,user,isAdmin} = useSelector(state => state.account)
  const [user, setUser] = useState("")
  const logout = async () => {
    try {
      await signOut(appAuth)
      localStorage.setItem("uid","");
      toast.success('Logout Successfully')
      navigate('/login')
    } catch (err) {
      toast.error(err.message)
    }
  }
  useEffect(() => {
    const callNow = async () => {
      const userdata = await loginUser()
      setUser(userdata)
    } 
    callNow();
  }, [])
  
  // useEffect(() => {
  //   if (isLogin) {
  //   } else {
  //     navigate('/login') 
  //   }
  // }, [isLogin])
  return (
    <>
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a className="navbar-brand brand-logo mr-5" href="/"><img src="../../images/logo.svg" className="mr-2" alt="logo" /></a>
          <a className="navbar-brand brand-logo-mini" href="/"><img src="../../images/logo-mini.svg" alt="logo" /></a>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span className="icon-menu"></span>
          </button>
          <ul className="navbar-nav mr-lg-2">
            <li className="nav-item nav-search d-none d-lg-block">
              <div className="input-group">
                <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                  <span className="input-group-text" id="search">
                    <i className="icon-search"></i>
                  </span>
                </div>
                <input type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" />
              </div>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile dropdown">
              <span className="nav-link dropdown-toggle" data-toggle="dropdown" id="profileDropdown">
                <img src="/images/faces/face27.jpg" alt="profile" />
              </span>
              <h5 className="ml-3 m-0">{user?.name}</h5>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                <Link to="/profile" className="dropdown-item">
                  <i className="ti-user text-primary"></i>
                  Profile
                </Link>
                <span className="dropdown-item" onClick={logout}>
                  <i className="ti-power-off text-primary"></i>
                  Logout
                </span>
              </div>
            </li>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span className="icon-menu"></span>
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navbar