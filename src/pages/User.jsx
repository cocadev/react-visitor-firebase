import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { realTimeDatabase } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getData } from '../firebase/getData';

const Users = () => {
  const [users, setUsers] = useState([])
  const { isAdmin } = useSelector(state => state.account)
  const navigate = useNavigate()
  useEffect(() => {
    const callNow = async () => {
      const snapshot = await getData('users')
      const data = snapshot['val']();
      const arr = []
      for (let x in data) {
        console.log(data[x])
        arr.push(data[x])
      }
      setUsers([...arr])
      console.log(arr)
    }
    callNow()
  }, [])

  const deleteuser = async (id) => {
    try {
      await remove(ref(realTimeDatabase, "users/" + id))
      toast.success("User removed Successfully")
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    // if (isAdmin) {

    // } else {
    //   navigate('/')
    //   toast.error("You have not access for this page")
    // }
  }, [isAdmin])

  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-lg-12 mb-3">
                <div className="d-flex justify-content-end">
                  <Link to="/users/new">
                    <button className='btn btn-primary'>+ Create New user</button>
                  </Link>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table-hover table display expandable-table datatable">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                            <th>Location</th>
                            <th>Created At</th>
                            <th>Update</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            users[0] && users.map((item, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>{item.name}</td>
                                  <td>{item.email}</td>
                                  {
                                    item.isAdmin ?
                                      <td className="text-success"><span className='icon-check'></span></td>
                                      :
                                      <td className="text-danger"><span className='icon-cross'></span></td>
                                  }
                                  <td>{item.location}</td>
                                  <td>{item.createdAt}</td>
                                  <td>
                                    {
                                      item.isAdmin ?
                                        "Admin"
                                        :
                                        <>
                                          <label className="btn btn-danger btn-sm mx-2" style={{ cursor: "pointer" }} onClick={e => deleteuser(item.uid)}>
                                          <span className="ti-trash"></span>
                                          </label>
                                          <Link to={`/users/${item.uid}`}>

                                            <label className="btn btn-warning btn-sm mx-2" style={{ cursor: "pointer" }} >
                                              <span className="ti-pencil"></span>
                                            </label>
                                          </Link>
                                        </>
                                    }
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
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

export default Users