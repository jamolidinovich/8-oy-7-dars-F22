// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({ element }) {
  const token = localStorage.getItem('authToken');

  return token ? element : <Navigate to="/login" />;
}

export default ProtectedRoutes;
