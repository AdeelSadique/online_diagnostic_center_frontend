import React from 'react';
import { Navigate } from 'react-router-dom';

function PatientRoute({ Auth, children }) {
  if (Auth.isActive && Auth.token != '' && Auth.userType == '0') {
    return children;
  }
  return <Navigate to={'/login'} />;
}

export default PatientRoute;
