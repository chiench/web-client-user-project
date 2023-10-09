import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider';

export default function guestlayout() {
    const {token,setToken} = useStateContext();
    function onSetToken () {
        setToken('đasad')
       }
    if(token) {
        return <Navigate to='/'/>
      }
  return (
    <div id="guestLayout">
    <Outlet />
  </div>
  )
}
