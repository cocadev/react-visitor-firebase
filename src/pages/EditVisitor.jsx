import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'
import { getData } from '../firebase/getData'
import { setData } from '../firebase/setData'

const EditVisitor = () => {
    const idtypes = [
        "passport", "demo", "abc"
    ]
    const [email, setEmail] = useState("")
    const [ASIC, setASIC] = useState("")
    const [escortName, setEscortName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [IDNumber, setIDNumber] = useState("")
    const [IDType, setIDType] = useState(idtypes[0])
    const [status, setStatus] = useState("")
    const { id } = useParams()
    const navigate = useNavigate()
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
    const edit = async () => {
        try {
            await setData(`visitorPassReq/${id}`,{ ...data, id })
            toast.success("Visitor pass update successfully")
            navigate('/visitorpass')
        } catch (err) {
            toast.error(err.message)
        }
    }
    
    useEffect(() => {
      const callNow = async () => {
          try {
              console.log(id)
              const request1 = await getData(`visitorPassReq/${id}`)
              const request = request1.val()
              setEmail(request['Email'])
              setASIC(request['Escort ASIC'])
              setEscortName(request['Escort Name'])
              setFirstName(request['FirstName'])
              setLastName(request['LastName'])
              setIDNumber(request['ID Number'])
              setIDType(request['ID Type'])
              setStatus(request['Status'])
          } catch (err) {
              toast.error(err.message)
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
                                                <div className="form-check mx-2">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="optionsRadios" checked={status == 'Requested'} value="Requested" onChange={e => setStatus(e.target.value)} />
                                                        Requested
                                                        <i className="input-helper"></i></label>
                                                </div>
                                                <div className="form-check mx-2">
                                                    <label className="form-check-label">
                                                        <input type="radio" className="form-check-input" name="optionsRadios" checked={status == 'Rejected'} value="Rejected" onChange={e => setStatus(e.target.value)} />
                                                        Rejected
                                                        <i className="input-helper"></i></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 mx-auto">
                                        <button className="btn btn-primary w-100" onClick={edit}>
                                            <h5 className='m-0'>Edit Visitor Pass</h5>
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

export default EditVisitor