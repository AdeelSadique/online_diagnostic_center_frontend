import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ Auth, children }) {
  if (Auth.isActive && Auth.token != '' && Auth.userType === '2') {
    return children;
  }
  return <Navigate to={'/login'} />;
}

export default AdminRoute;
