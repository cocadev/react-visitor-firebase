import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'
import { getData } from '../firebase/getData'
import { setData } from '../firebase/setData'

const EditUser = () => {
    const [email, setEmail] = useState("")
    const [location, setLocation] = useState("")
    const [createdAt, setCreatedAt] = useState(new Date().toDateString())
    const [username, setUsername] = useState("")
    const [admin, setAdmin] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    const editUser = async () => {
        const data = {
            uid: id,
            name: username,
            email: email,
            createdAt: createdAt,
            location: location,
            isAdmin: admin
        }
        await setData(`users/${id}`,data)
        toast.success("User edit Successfully")
        navigate('/users')
    }

    useEffect(() => {
        const callNow = async () => {
            const snapshot = await getData(`users/${id}`)
                if (snapshot.exists()) {
                    const user = snapshot.val();
                    setEmail(user.email)
                    setUsername(user.name)
                    setCreatedAt(user.createdAt)
                    setAdmin(user.isAdmin)
                    setLocation(user.location)
                } else {
                    toast.error("User does not exists")
                    navigate('/users')
                }
        }
        callNow()
    }, [])

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
                                                <label>Location</label>
                                                <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="row align-items-center">
                                                <div className="col-md-6">
                                                    <div className="form-group mb-0">
                                                        <label>Create At</label>
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
                                                <button className="btn btn-primary w-100 mt-3" onClick={editUser}><h5 className='mb-0'>Edit User</h5></button>
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

export default EditUser