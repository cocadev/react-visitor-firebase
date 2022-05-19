import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Axios } from 'apis/axios';
export default function Logout(){
    const history = useHistory();
    useEffect(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('portal-token');
        localStorage.removeItem('role');
        Axios.defaults.headers={
            'Content-Type': "application/json"
        }
          history.push('/login')
    },[])
    return(
        <></>
    )
}