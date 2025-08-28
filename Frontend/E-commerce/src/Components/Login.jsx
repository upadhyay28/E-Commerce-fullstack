import React from 'react'
import {Link} from "react-router-dom"

import "./Login.css"

const Login = () => {
  return (

       <div className='login'>
      <h2>Login</h2>
      <div>
        <label htmlFor="name">Enter the Email : </label>
        <input
          type="text"
          placeholder="Enter the username"
          id="name"
        />
      </div>
      <div>
        <label htmlFor="pas">Password : </label>
        <input
          type="password"
          placeholder="Enter the Password"
  
        />
      </div>
      <div className='option'>
         <input type="checkbox" />
        <label htmlFor="remember">Remember Me</label>
        
      </div>
      <Link to="/"> 
        <span>
          <input
            type="submit"
            value="Login"
          />
        </span>
      </Link>
      <p>
        Not a member ? <Link to="/Signup">Sign up Now</Link>
      </p>
    </div>
  )
}

export default Login
