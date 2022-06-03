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
import { getData } from './firebase/getData';
// import 'bootstrap/dist/css/bootstrap.min.css';

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
              <Route path='/profile' element={
                <PrivetRoute>
                  <Profile />
              </PrivetRoute>
              }></Route>
              <Route path='/visitorpass' element={
                <PrivetRoute>
              <VisitorPass />
              </PrivetRoute>
              }></Route>
              <Route path='/register/:id' element={
                <PrivetRoute>
              <RegisterComplete />
              </PrivetRoute>
              }></Route>
              <Route path='/visitorpass/new' element={
              <PrivetRoute><NewVisitor /></PrivetRoute>}></Route>
              <Route path='/visitorpass/:id' element={<PrivetRoute><EditVisitor /></PrivetRoute>}></Route>
              <Route path='/login' element={<AuthRoute><Login /></AuthRoute>}></Route>
              <Route path='/register' element={<AuthRoute><Register /></AuthRoute>}></Route>
            </Routes>
          </Router>
      }
    </>
  );
}

const PrivetRoute = ({ children }) => {
  const user = localStorage.getItem('uid')
  const [userdata, setUserdata] = useState("")
  const [setData, setSetData] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const callNow = async () => {
      if (user) {
        try {
          const user1 = (await getData(`users/${user}`)).val()
          setUserdata(user1)
          setSetData(true)
        } catch (err) {
          toast.error(err.message)
          setSetData(true)
        }
      } else {
        navigate('/login')
        localStorage.setItem("uid", "")
        setSetData(true)
      }
    }
    callNow();
  }, [])
  if (setData) {
    return <>
      {
        userdata ? children : <Navigate to={'/login'} />
      }
    </>
  } else {
    return <>
      <>
        <div className="d-flex" style={{ height: '100vh' }}>
          <div className="m-auto">
            <img src="/images/waiting.gif" alt="wait" width="290px" />
          </div>
        </div>
      </>
    </>
  }
}

const AuthRoute = ({ children }) => {
  const user = localStorage.getItem('uid')
  const [userdata, setUserdata] = useState("")
  const [setData, setSetData] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    const callNow = async () => {
      if (user) {
        try {
          const user1 = (await getData(`users/${user}`)).val()
          setUserdata(user1)
          setSetData(true)
        } catch (err) {
          toast.error(err.message)
          setSetData(true)
        }
      } else {
        navigate('/login')
        localStorage.setItem("uid", "")
        setSetData(true)
      }
    }
    callNow();
  }, [])
  if (setData) {
    return <>
      {
        !userdata ? children : <Navigate to={'/'} />
      }
    </>
  } else {
    return <>
      <>
        <div className="d-flex" style={{ height: '100vh' }}>
          <div className="m-auto">
            <img src="/images/waiting.gif" alt="wait" width="290px" />
          </div>
        </div>
      </>
    </>
  }
}

export default App;

