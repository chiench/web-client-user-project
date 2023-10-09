import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

export default function register() {

    const name = useRef('');
    const email  = useRef('');
    const newPassword = useRef('');
    const confirmPassword = useRef('');
    const [errors, setErrors] = useState([]);
    const onSubmit = (e) => {

      const payload = {
        name: name.current.value,
        email: email.current.value,
        password: newPassword.current.value,
        confirmPassword: confirmPassword.current.value,
      }
      //
        console.log(payload,'payload');
        e.preventDefault();
    }
  return (
    <div className="login-signup-form animated fadeInDown">
    <div className="form">
      <form onSubmit={onSubmit}>
        <h1 className="title">Signup for Free</h1>
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
