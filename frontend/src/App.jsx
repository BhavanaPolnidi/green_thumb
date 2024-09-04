import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPopUp from './LoginPopUp';
import Login from './components/Login';
import Signup from './components/Signup';
import UserPage from './UserPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import axios from 'axios';
import Reminder from "./Reminders";
import Design from './Design';
import Ecommerce from '../public/frontend/src/App';
function App() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showHomePage, setShowHomePage] = useState(true);
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Load user data if a token exists
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/auth/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser({ name: response.data.name });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
      })
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoginPopup(true);
      setShowHomePage(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showHomePage) {
      const checkLoginStatus = () => {
        const lastLogoutTime = localStorage.getItem('lastLogoutTime');
        if (lastLogoutTime && Date.now() - lastLogoutTime > 5 * 60 * 1000) { // 5 minutes
          setShowLoginPopup(true);
        }
      };

      const interval = setInterval(checkLoginStatus, 1000); // Check every second

      return () => clearInterval(interval);
    }
  }, [showHomePage]);

  const handleStayLoggedOut = () => {
    setShowHomePage(true);
    setShowLoginPopup(false);
    localStorage.setItem('lastLogoutTime', Date.now());
  };

  const handleLogin = (token, userName) => {
    localStorage.setItem('token', token);
    setUser({ name: userName });
    setShowHomePage(false);
    setShowLoginPopup(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={showHomePage ? <HomePage /> : <LoginPopUp onStayLoggedOut={handleStayLoggedOut} />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userpage" element={loading ? <div>Loading...</div> : <ProtectedRoute element={<UserPage user={user} />} />} />
        <Route path="/reminder" element={<Reminder />} />
        <Route path="/design" element={<Design />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
      </Routes>
    </Router>
  );
}

export default App;
