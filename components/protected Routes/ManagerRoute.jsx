import React from 'react';
import { Navigate } from 'react-router-dom';

function ManagerRoute({ Auth, children }) {
  if (Auth.isActive && Auth.token != '' && Auth.userType === '1') {
    return children;
  }
  return <Navigate to={'/login'} />;
}

export default ManagerRoute;
