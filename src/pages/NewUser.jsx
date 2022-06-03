import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'
import { appAuth, realTimeDatabase } from '../firebase'
import { setData } from '../firebase/setData'

const NewUser = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [location, setLocation] = useState("")
    const [createdAt, setCreatedAt] = useState(new Date().toDateString())
    const [username, setUsername] = useState("")
    const [admin, setAdmin] = useState(false)
    const navigate = useNavigate()
    const createuser = async () => {
        try {
            const res = await createUserWithEmailAndPassword(appAuth, email, password);
            const data = {
                uid: res.user.uid,
                name: username,
                authProvider: "email",
                email: email,
                createdAt: createdAt,
                location: location,
                isAdmin: admin
            }
            await setData(`users/${res.user.uid}`, data)
            toast.success('Add User Successfully')
            navigate('/users')
        } catch (err) {
            toast.error(err.message)
        }
    }
    return (
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
                                            User Information
                                        </div>
                                        <div className="mb-3">
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
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
                                                <label>Password</label>
                                                <input type="password" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
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
                                                        <label>Created At</label>
                                                        <input type="date" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Location" onChange={e => setCreatedAt(new Date(e.target.value).toDateString())} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-check mx-sm-2">
                                                        <label className="form-check-label">
                                                            <input type="checkbox" className="form-check-input" checked={admin} onChange={e => setAdmin(!admin)} />
                                                            Admin
                                                            <i className="input-helper"></i>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="w-100 mx-3">
                                                <button className="btn btn-primary w-100 mt-3" onClick={createuser}><h5 className='mb-0'>Add User</h5></button>
                                            </div>
                                            <div className="w-100 mx-3">
                                                <Link to="/users">
                                                    <button className="btn btn-primary w-100 mt-3"><h5 className='mb-0'>Go back</h5></button>
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
                                        <div className="mb-4">
                                            <h4 className="mb-3 font-weight-bold">Admin :</h4>
                                            <h4>{admin ? <span className='icon-check'></span> : <span className="icon-cross"></span>}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewUser