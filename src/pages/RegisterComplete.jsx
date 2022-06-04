import { get, ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { realTimeDatabase } from '../firebase'
import { getData } from '../firebase/getData'
import { setData } from '../firebase/setData'

const RegisterComplete = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [location, setLocation] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [admin, setAdmin] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const submit = async () => {
        try {
            const data = {
                email, isAdmin: admin, location, createdAt, uid: id, name: username, authProvider: "email"
            }
            await setData(`users/${id}`,data)
            toast.success("Register Complete")
            navigate('/')
        } catch (err) {
            toast.error(err.message)
        }

    }
    useEffect(() => {
        const callNow = async () => {
            try {
                const data = await getData(`users/${id}`);
                const user = data.val()
                setEmail(user.email)
                setCreatedAt(user.createdAt)
                setAdmin(admin)
            } catch (err) {
                toast.error(err.message)
            }
        }
        callNow()
    }, [])
    
    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-4 mx-auto">
                            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                <h4>Compelte Profile</h4>
                                <h6 className="font-weight-light">It is last steps</h6>
                                <div className="pt-3">

                                    <div className="form-group">
                                        <label htmlFor="">Name</label>
                                        <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Name" value={username} onChange={e => setUsername(e.target.value)} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Location</label>
                                        <input type="text" className="form-control form-control-lg" value={location} placeholder="Location" onChange={e => setLocation(e.target.value)} />
                                    </div>
                                    <div className="mt-3">
                                        <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={submit}>SIGN UP</button>
                                    </div>
                                    <div className="text-center mt-4 font-weight-light">
                                        Already have an account? <Link to="/login" className="text-primary">Login</Link>
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

export default RegisterComplete