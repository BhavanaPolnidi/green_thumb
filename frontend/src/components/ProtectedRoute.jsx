import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = !!localStorage.getItem('token'); // Check if token exists
  return isLoggedIn ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
