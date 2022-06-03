import { onValue, ref, remove } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'
import { realTimeDatabase } from '../firebase'

const VisitorPass = () => {
    const [visitors, setVisitors] = useState([])
    useEffect(() => {
        const starCountRef = ref(realTimeDatabase, 'visitorPassReq');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot['val']();
            const arr = []
            for (let x in data) {
                console.log(data[x])
                arr.push(data[x])
            }
            setVisitors([...arr])
            console.log(arr)
        });
    }, [])
    const deletePass = async (id) => {
        try {
            await remove(ref(realTimeDatabase, `visitorPassReq/${id}`))
            toast.success("Remove Pass Successfully")
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
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-center justify-content-lg-end">
                                    <div className="my-3">
                                        <Link to="/visitorpass/new">
                                            <button className="btn btn-primary">+ Create New</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <table className='table-hover table display expandable-table datatable'>
                                <thead>
                                    <tr>
                                        <th style={{ whiteSpace: "nowrap" }}>No</th>
                                        <th style={{ whiteSpace: "nowrap" }}>email</th>
                                        <th style={{ whiteSpace: "nowrap" }}>Escort ASIC</th>
                                        <th style={{ whiteSpace: "nowrap" }}>Escort Name</th>
                                        <th style={{ whiteSpace: "nowrap" }}>FirstName</th>
                                        <th style={{ whiteSpace: "nowrap" }}>ID Number</th>
                                        <th style={{ whiteSpace: "nowrap" }}>ID Type</th>
                                        <th style={{ whiteSpace: "nowrap" }}>LastName</th>
                                        <th style={{ whiteSpace: "nowrap" }}>Status</th>
                                        <th style={{ whiteSpace: "nowrap" }}>Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visitors[0] && visitors.map((item, index) => {
                                        return (<tr>
                                            <td style={{ whiteSpace: "nowrap" }}>{index + 1}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{item.Email}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{item["Escort ASIC"]}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{item["Escort Name"]}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{item.FirstName}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{item['ID Number']}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{item['ID Type']}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{item.LastName}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>{item.Status}</td>
                                            <td style={{ whiteSpace: "nowrap" }}>
                                                <Link to={`/visitorpass/${item.id}`}>
                                                    <label className="btn btn-warning btn-sm mx-2" style={{ cursor: "pointer" }} >
                                                        <span className="ti-pencil"></span>
                                                    </label>
                                                </Link>
                                                <label className="btn btn-danger btn-sm mx-2" style={{ cursor: "pointer" }} onClick={e => deletePass(item.id)}>
                                                    <span className="ti-trash"></span>
                                                </label>
                                            </td>
                                        </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VisitorPass