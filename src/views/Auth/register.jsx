import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../../axios/axiosConfig';
import { useStateContext } from '../../context/ContextProvider';

export default function register() {
  const {setToken} = useStateContext();
    const name = useRef('');
    const email  = useRef('');
    const newPassword = useRef('');
    const confirmPassword = useRef('');
    const [errors, setErrors] = useState(null);
    const onSubmit = (e) => {
      e.preventDefault();
      const payload = {
        name: name.current.value,
        email: email.current.value,
        password: newPassword.current.value,
        password_confirmation: confirmPassword.current.value,
      }
   
      axiosClient.post('/register', payload)
      .then((res) => {
       if(res.status == 200) {
         setToken(res.data.token)
       }
      })
      .catch((errors) => {
        setErrors(errors.response.data.errors)
      });
    }
  return (
    <div className="login-signup-form animated fadeInDown">
    <div className="form">
      <form onSubmit={onSubmit}>
        <h1 className="title">Signup for Free</h1>
        {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          
        <input  ref={name} type="text" placeholder="Full Name"/>
        <input ref={email} type="email" placeholder="Email Address"/>
        <input ref={newPassword}  type="password"  autoComplete="on" placeholder="Password"/ >
        <input ref={confirmPassword} type="password"  autoComplete="on" placeholder="Repeat Password"/>
        <button className="btn btn-block">Signup</button>
        <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
      </form>
    </div>
  </div>
  )
}
