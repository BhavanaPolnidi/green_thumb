import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState(''); // Add state for name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/signup', { name, email, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error registering user');
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
        <h1 style={{ color: '#28a745' }}>Sign Up</h1>
        <form onSubmit={handleSignup} style={{ width: '100%' }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
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
            Sign Up
          </button>
          <Link 
            to="/login" 
            style={{ 
              display: 'block', 
              marginTop: '15px', 
              color: '#28a745', 
              textDecoration: 'none', 
              fontSize: '0.9rem' 
            }}
          >
            Login
          </Link>
        </form>
        {message && <p style={{ marginTop: '15px', color: '#28a745' }}>{message}</p>}
      </div>
    </div>
  );
}

export default Signup;