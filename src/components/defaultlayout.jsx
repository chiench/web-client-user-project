import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'

export default function defaultlayout() {
    const {user, token, setToken} = useStateContext();
    function onSetToken () {
      setToken(null)
     }
    if(!token) {
      return <Navigate to='/login'/>
    }
  return (
   
    <div>
        defaultlayout
        <button onClick={onSetToken}>logout</button>
         <Outlet/>
        </div>
  )
}
