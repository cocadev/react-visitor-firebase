import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import toast, { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { appAuth, realTimeDatabase } from './firebase';
import { useEffect, useState } from 'react';
import Users from './pages/User';
import NewUser from './pages/NewUser';
import EditUser from './pages/EditUser';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAdmin, setLogin, setUser } from './store/accountSlice';
import { get, ref } from 'firebase/database';
import Profile from './pages/Profile';
import VisitorPass from './pages/VisitorPass';
import NewVisitor from './pages/NewVisitor';
import EditVisitor from './pages/EditVisitor';
import RegisterComplete from './pages/RegisterComplete';

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    onAuthStateChanged(appAuth, (user) => {
      if (user) {
        console.log(user)
        get(ref(realTimeDatabase, `users/${user.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const user = snapshot.val();
            console.log(user)
            dispatch(setUser(user))
            dispatch(setIsAdmin(user.isAdmin))
            dispatch(setLogin(true))
          } else {
            // dispatch(setUser({}))
            // dispatch(setIsAdmin(false))
            // dispatch(setLogin(false))
          }
        })
      } else {
        console.log("Singout")
        // dispatch(setUser({}))
        // dispatch(setIsAdmin(false))
        // dispatch(setLogin(false))
      }
    })
  }, [])
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, [])
  
  return (
    <>
      {
        loading ?
          <>
            <div className="d-flex" style={{ height: '100vh' }}>
              <div className="m-auto">
                <img src="/images/waiting.gif" alt="wait" width="290px" />
              </div>
            </div>
          </>
          :
          <Router>
            <Toaster/>
            <Routes>
              <Route
                path='/'
                element={
                  <PrivetRoute>
                    <Home />
                  </PrivetRoute>
                }></Route>
              <Route
                path='/users'
                element={
                  <PrivetRoute>
                    <Users />
                  </PrivetRoute>
                }></Route>
              <Route
                path='/users/new'
                element={
                  <PrivetRoute>
                    <NewUser />
                  </PrivetRoute>
                }></Route>
              <Route
                path='/users/:id'
                element={
                  <PrivetRoute>
                    <EditUser />
                  </PrivetRoute>
                }></Route>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/visitorpass' element={<VisitorPass />}></Route>
              <Route path='/register/:id' element={<RegisterComplete />}></Route>
              <Route path='/visitorpass/new' element={<NewVisitor />}></Route>
              <Route path='/visitorpass/:id' element={<EditVisitor />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
            </Routes>
          </Router>
      }
    </>
  );
}

const PrivetRoute = ({ children }) => {
  const { isLogin } = useSelector(state => state.account)
  console.log(isLogin)
  return <>
    {
      children
    }
  </>
}

export default App;

