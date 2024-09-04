import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful');
      navigate('/userpage'); // Navigate to /userpage on successful login
    } catch (error) {
      setMessage('Invalid email or password');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      backgroundColor: 'white', 
      color: '#28a745', 
      textAlign: 'center' 
    }}>
      <div style={{ 
        border: '2px solid #28a745', // Green border color
        borderRadius: '8px', // Rounded corners
        padding: '20px', // Space inside the border
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: shadow for better appearance
        width: '300px' // Set a fixed width
      }}>
        <h1 style={{ color: '#28a745' }}>Login</h1>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ 
                width: '100%', 
                padding: '10px', // Increased padding for more space
                borderRadius: '4px', 
                border: '1px solid #28a745', 
                boxSizing: 'border-box' // Ensure padding doesn't affect width
              }} 
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ 
                width: '100%', 
                padding: '10px', // Increased padding for more space
                borderRadius: '4px', 
                border: '1px solid #28a745', 
                boxSizing: 'border-box' // Ensure padding doesn't affect width
              }} 
            />
          </div>
          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '4px', 
              border: 'none', 
              backgroundColor: '#28a745', 
              color: 'white', 
              fontSize: '1rem', 
              cursor: 'pointer' 
            }}
          >
            Login
          </button>
          <Link 
            to="/signup" 
            style={{ 
              display: 'block', 
              marginTop: '15px', 
              color: '#28a745', 
              textDecoration: 'none', 
              fontSize: '0.9rem' 
            }}
          >
            Click here to sign up
          </Link>
        </form>
        {message && <p style={{ marginTop: '15px', color: '#28a745' }}>{message}</p>}
      </div>
    </div>
  );
}

export default Login;