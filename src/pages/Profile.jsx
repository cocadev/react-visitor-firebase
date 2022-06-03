import React, { useState, useEffect } from 'react'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { get, ref, set } from 'firebase/database'
import { appAuth, realTimeDatabase } from '../firebase'
import toast from 'react-hot-toast'
import { updateEmail } from 'firebase/auth'
import { setUser } from '../store/accountSlice'
import { getData, loginUser } from '../firebase/getData'
import { setData } from '../firebase/setData'
const Profile = () => {
    const [email, setEmail] = useState("")
    const [location, setLocation] = useState("")
    const [createdAt, setCreatedAt] = useState(new Date().toDateString())
    const [username, setUsername] = useState("")
    const [user, setUser] = useState("")
    // const { user } = useSelector(state => state.account)
    // const user = appAuth.currentUser
    console.log(appAuth.currentUser)
    const editUser = async () => {
        // if (email != user.email) {
        //     try {
        //         await updateEmail(appAuth.currentUser,email)
        //     } catch (err) {
        //     }
        // }
        const data = {
            uid: user.uid,
            name: username,
            email: email,
            createdAt: createdAt,
            location: location,
            isAdmin: user.isAdmin
        }
        await setData(`users/${user.uid}`, data)
        toast.success("Update Successfully")
    }
    useEffect(() => {
        const callNow = async () => {
            const id = appAuth.currentUser.uid
            const user1 = await loginUser();
            setUser(user1)
            setEmail(user1.email)
            setUsername(user1.name)
            setLocation(user1.location)
            setCreatedAt(user1.createdAt)
        }
        callNow();
    }, [])
    return (
        <>
            <div className="container-scroller">
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-title font-weight-bold h3">
                                                User Profile
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" value={email} readonly />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Name" value={username} onChange={e => setUsername(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-group">
                                                    <label>Location</label>
                                                    <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="row align-items-center">
                                                    <div className="col-md-6">
                                                        <div className="form-group mb-0">
                                                            <label>Created Add</label>
                                                            <input type="date" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Location" onChange={e => setCreatedAt(new Date(e.target.value).toDateString())} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <div className="w-100 mx-3">
                                                    <button className="btn btn-primary w-100 mt-3" onClick={editUser}><h5 className='mb-0'>Edit info</h5></button>
                                                </div>
                                                <div className="w-100 mx-3">
                                                    <Link to="/">
                                                        <button className="btn btn-primary w-100 mt-3"><h5 className='mb-0'>Home</h5></button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-title font-weight-bold h3 mb-4">
                                                User Preview
                                            </div>
                                            <div className="mb-4">
                                                <h4 className="mb-3 font-weight-bold">Name :</h4>
                                                <h4>{username ? username : "--"}</h4>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className="mb-3 font-weight-bold">Email :</h4>
                                                <h4>{email ? email : "--"}</h4>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className="mb-3 font-weight-bold">Location :</h4>
                                                <h4>{location ? location : "--"}</h4>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className="mb-3 font-weight-bold">Created At :</h4>
                                                <h4>{createdAt ? createdAt : "--"}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-title">
                                                Change Password
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile