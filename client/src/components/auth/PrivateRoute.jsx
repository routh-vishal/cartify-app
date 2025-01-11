import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!window.sessionStorage.getItem("authToken");
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
