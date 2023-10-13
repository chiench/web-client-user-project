import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../../axios/axiosConfig';
import { useStateContext } from '../../context/ContextProvider';

export default function login() {
  const [errors, setErrors] = useState(null);
  const {setUser,setToken} = useStateContext();
  const [errorSingle, seterrorSingle] = useState(null);
  const email = useRef('');
  const newPassword = useRef('');
    const onSubmit = (e) => {
      const payload = {
        email: email.current.value,
        password: newPassword.current.value,
      }
        e.preventDefault();
        axiosClient.post('/login', payload)
      .then((res) => {
        if(res.status == 200) {
          setUser(res.data.user);
          setToken(res.data.token)
        }
      })
      .catch((errors) => {
        if(errors.response && errors.response.data.error){
          seterrorSingle(errors.response.data.error)
        } else if (errors.response && errors.response.data.errors) {
          setErrors( errors.response.data.errors)
        } else if(! errors.response &&  errors.message) {
          seterrorSingle(`${errors.message }. Check to connect network or port again`)
        }
      });
    }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          {
            errorSingle &&  <div className="alert">
            {errorSingle}
          </div>
          }
          <input  ref={email} type="email" placeholder="Email"/>
          <input ref={newPassword} type="password"   autoComplete="on" placeholder="Password"/>
          <button className="btn btn-block" type='submit'>Login</button>
          <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
        </form>
      </div>
    </div>
  )
}
