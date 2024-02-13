import React, { useState } from 'react';
import "./auth.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordText = showPassword ? 'Hide' : 'Show';
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/login', formData, { withCredentials: true });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('Check Credentials');
      } else {
        console.error('Login failed:', error.message);
      }
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="registration__container">
      <ToastContainer />
      <div className="item__container">
        <h1>Login</h1>
        <form onSubmit={login}>
          <input type="email" className='auth__input' placeholder='Email' name='email' onChange={handleChange} required />

          <div className="password-container">
            <input type={showPassword ? 'text' : 'password'} className="auth__input" placeholder='Password' name='password' onChange={handleChange} required />
            <span className="toggle-password" onClick={handleTogglePassword}>
              {togglePasswordText}
            </span>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>

      <p className="transfer">
        New to Blogify?
        <Link to="/register" style={{ textDecoration: "none", color: "rgb(72, 67, 67)" }}><span> Join now</span></Link>
      </p>
    </div>
  )
}

export default Login;