import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'

import axiosClient from '../axios/axiosConfig';

export default function defaultlayout() {
    const {user, token, setToken} = useStateContext();
    console.log(user)
    function onSetToken () {
      setToken(null)
     }
    if(!token) {
      return <Navigate to='/login'/>
    }

    function onGetUser () {
      axiosClient.post('/logout').then((res) => {
        console.log(res,3333)
        
      }).catch((err) => {
        console.log(err,2222)
      });
    }
  return (
   
  
      <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>

          <div>
            {user.name} &nbsp; &nbsp;
            <a onClick={onSetToken} className="btn-logout" href="#">Logout</a>
            <a onClick={onGetUser} className="btn-logout" href="#">GetUser</a>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        
      </div>
       
        </div>
  )
}
