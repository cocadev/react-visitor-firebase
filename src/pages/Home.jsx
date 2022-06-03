import React, { useState } from 'react'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'

const Home = () => {

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card tale-bg">
                    <div className="card-people mt-auto">
                      <img src="images/dashboard/people.svg" alt="people" />
                      <div className="weather-info">
                        <div className="d-flex">
                          <div>
                            <h2 className="mb-0 font-weight-normal"><i className="icon-sun mr-2"></i>31<sup><sup>o </sup>C</sup></h2>
                          </div>
                          <div className="ml-3">
                            <h4 className="location font-weight-normal">Wollongong</h4>
                            <h6 className="font-weight-normal mt-2">Australia</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home