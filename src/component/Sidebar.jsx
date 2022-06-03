import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { isLogin, user, isAdmin } = useSelector(state => state.account)
  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="icon-grid menu-icon"></i>
              <span className="menu-title">Dashboard</span>
            </Link>
          </li>
          {
            isAdmin ?
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <i className="icon-head menu-icon"></i>
                  <span className="menu-title">Users</span>
                </Link>
              </li> : ""
          }
          <li className="nav-item">
            <Link className="nav-link" to="/visitorpass">
              <i className="icon-columns menu-icon"></i>
              <span className="menu-title">Visitor Pass Request</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Sidebar