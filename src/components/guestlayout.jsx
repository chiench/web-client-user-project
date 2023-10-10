import React, { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios/axiosConfig';


export default function guestlayout() {

    const {token,setToken} = useStateContext();
    if(token) {
        return <Navigate to='/'/>
      }
  return (
    <div id="guestLayout">
    <Outlet />
  </div>
  )
}
