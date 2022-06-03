import { ref, set } from 'firebase/database'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'
import { realTimeDatabase } from '../firebase'
import { setData } from '../firebase/setData'

const NewVisitor = () => {
    const [email, setEmail] = useState("")
    const [ASIC, setASIC] = useState("")
    const [escortName, setEscortName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [IDNumber, setIDNumber] = useState("")
    const [IDType, setIDType] = useState("")
    const [status, setStatus] = useState("")
    const data = {
        Email: email,
        'Escort ASIC': ASIC,
        'Escort Name': escortName,
        FirstName: firstName,
        'ID Number': IDNumber,
        'ID Type': IDType,
        LastName: lastName,
        Status: status
    }
    const idtypes = [
        "passport", "demo", "abc"
    ]
    const navigate = useNavigate()
    function generateString(length) {
        let result = ' ';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const create = async () => {
        const id = generateString(7);
        const newId = id.replace(/\s+/g, ' ').trim()
        try {
            await setData(`visitorPassReq/${newId}`, { ...data, id: newId })
            toast.success("Visitor pass request successfully")
            navigate('/visitorpass')
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
                            <div className="col-lg-10 mx-auto">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" className="form-control form-control-lg" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <div className="form-group">
                                                <label>Escort ASIC</label>
                                                <input type="email" className="form-control form-control-lg" placeholder="Escort ASIC" value={ASIC} onChange={e => setASIC(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <div className="form-group">
                                                <label>Escort Name</label>
                                                <input type="email" className="form-control form-control-lg" placeholder="Escort Name" value={escortName} onChange={e => setEscortName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <div className="form-group">
                                                <label>FirstName</label>
                                                <input type="email" className="form-control form-control-lg" placeholder="FirstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <div className="form-group">
                                                <label>LastName</label>
                                                <input type="email" className="form-control form-control-lg" placeholder="LastName" value={lastName} onChange={e => setLastName(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <div className="form-group">
                                                <label>ID Number</label>
                                                <input type="email" className="form-control form-control-lg" placeholder="ID Number" value={IDNumber} onChange={e => setIDNumber(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <div className="form-group">
                                                <label>ID Type</label>
                                                <select className="form-control form-control-lg" onChange={e => setIDType(e.target.value)}>
                                                    {
                                                        idtypes.map(item => {
                                                            return <option value={item}>{item}</option>
                                                        })
                                                    }
                                                </select>
                                                {/* <input type="email" className="form-control form-control-lg" placeholder="ID Type" value={IDType} onChange={e => setIDType(e.target.value)} /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label>Status</label>
                                            <div className="form-group form-inline">
                                                <div class="form-check mx-2">
                                                    <label class="form-check-label">
                                                        <input type="radio" class="form-check-input" name="optionsRadios" checked={status == 'Requested'} value="Requested" onChange={e => setStatus(e.target.value)} />
                                                        Requested
                                                        <i class="input-helper"></i></label>
                                                </div>
                                                <div class="form-check mx-2">
                                                    <label class="form-check-label">
                                                        <input type="radio" class="form-check-input" name="optionsRadios" checked={status == 'Rejected'} value="Rejected" onChange={e => setStatus(e.target.value)} />
                                                        Rejected
                                                        <i class="input-helper"></i></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 mx-auto">
                                        <button className="btn btn-primary w-100" onClick={create}>
                                            <h5 className='m-0'>Request Visitor Pass</h5>
                                        </button>
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

export default NewVisitor