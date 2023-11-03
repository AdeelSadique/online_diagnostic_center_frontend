import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../components/Header';
import Home from '../components/Home';
import Footer from '../components/Footer';
import Tests from '../components/Tests';
import HospitalReg from '../components/HospitalReg';
import Signup from '../components/Signup';
import Login from '../components/Login';
import PageNotFound from '../components/protected Routes/PageNotFound';
import PatientRoute from '../components/protected Routes/PatientRoute';
import ManagerRoute from '../components/protected Routes/ManagerRoute';
import AdminRoute from '../components/protected Routes/AdminRoute';
import Patient from '../components/dashboards/patients/Patient';
import Manager from '../components/dashboards/manager/Manager';
import Admin from '../components/dashboards/admin/Admin';
import { useSelector } from 'react-redux';
import LoaderCircle from './LoadingCircle';
import PasswordReset from '../components/PasswordReset';
function App() {
  const isLogged = useSelector((state) => state.isLogged);
  const [loading, setLoading] = useState(true);

  const Auth = {
    isActive: isLogged.isLogged,
    userType: isLogged.data.user_type,
    token: localStorage.getItem('userToken'),
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {loading ? (
        <LoaderCircle />
      ) : (
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<PageNotFound />} />

            <Route path='/tests' element={<Tests />} />
            <Route path='/hospitalReg' element={<HospitalReg />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/passwordReset' element={<PasswordReset />} />

            <Route
              path='/patientDashboard'
              element={
                <PatientRoute Auth={Auth}>
                  <Patient />
                </PatientRoute>
              }
            />
            <Route
              path='/managerDashboard'
              element={
                <ManagerRoute Auth={Auth}>
                  <Manager />
                </ManagerRoute>
              }
            />
            <Route
              path='/adminDashboard'
              element={
                <AdminRoute Auth={Auth}>
                  <Admin />
                </AdminRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      )}
    </>
  );
}

export default App;
