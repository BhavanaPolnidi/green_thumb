import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#d3dec9',
  },
  popup: {
    backgroundColor: '#b5c2a7',
    width: '450px',
    height: '350px',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
  },
  welcomeText: {
    fontSize: '35px',
    fontWeight: 'bold',
    color: '#000',
    marginLeft: '20px',
  },
  description: {
    margin: '10px 0 0 0',
    color: '#000',
    fontSize: '14px',
  },
  loginButton: {
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    width: '90%',
    height: '50px',
    marginTop: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  },
  stayLoggedOutButton: (isHovered) => ({
    marginTop: '20px',
    backgroundColor: isHovered ? '#000' : 'transparent',
    color: isHovered ? '#fff' : '#000',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    width: '90%',
    height: '50px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: 'bold',
  }),
};

function LoginPopUp({ onStayLoggedOut }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/login');
  };

  const handleStayLoggedOut = () => {
    onStayLoggedOut(); // Communicate with App.js
  };

  return (
    <div style={styles.container}>
      <div style={styles.popup}>
        <span style={styles.welcomeText}>
          Welcome <span role="img" aria-label="sparkles">✨</span>
        </span>
        <span style={styles.description}>
          Log in or Sign up to access <br />the features regarding garden and more..
        </span>
        <Link to="/login" style={styles.loginButton} onClick={handleLogin}>
          Log in
        </Link>
        <button
          onClick={handleStayLoggedOut}
          style={styles.stayLoggedOutButton(isHovered)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Stay logged out
        </button>
      </div>
    </div>
  );
}

export default LoginPopUp;
