import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './RegistrationForm.css'; // Import CSS file for neumorphic styling

function Login() {
  const { setUserEmail } = useContext(UserContext);
  document.body.style.background = 'rgb(218 191 252)';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        setIsLoggedIn(true);
        setUserEmail(email);
        localStorage.setItem('userEmail', email);
        if (email === 'skbhikkusaheb@gmail.com' && password === '4451B@bbinterview') {
          setIsAdmin(true);
          localStorage.setItem('isAdmin', 'true');
        } else {
          setIsAdmin(false);
          localStorage.removeItem('isAdmin');
        }
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('Invalid email or password. Please try again.');
      setEmail('');
      setPassword('');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  const getWidth = () => {
    return windowWidth > 1200 ? '30%' : 'null';
  };

  return (
    <div className="container text-center" style={{ marginTop: '10%', width: getWidth() }}>
      <h2>Welcome to JobGrowTh</h2>
      <div className="card neumorphic">
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          {error && <div>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3 neumorphic-input">
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                autoComplete="username"
              />
            </div>
            <div className="mb-3 neumorphic-input">
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="User Password"
                required
                autoComplete="current-password"
              />
            </div>
            {!isLoggedIn && (
              <button className="btn btn-primary text-black neumorphic-button" type="submit">
                Login
              </button>
            )}
          </form>
        </div>
      </div>
      <div className="btn btn-primary neumorphic-button my-3">
        <Link className="text-black" to="/Registration" style={{ textDecoration: 'none' }}>Don't Have Account</Link>
      </div>
    </div>
  );
}

export default Login;
