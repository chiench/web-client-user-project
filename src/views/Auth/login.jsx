import React from 'react'
import { Link } from 'react-router-dom';

export default function login() {

    const onSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          <input  type="email" placeholder="Email"/>
          <input type="password"   autoComplete="on" placeholder="Password"/>
          <button className="btn btn-block" type='submit'>Login</button>
          <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
        </form>
      </div>
    </div>
  )
}
