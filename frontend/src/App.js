import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './Login';
import Logout from './Logout';
import ProjectList from './Projects';
import CompanyList from './Companies';
import UserList from './Users';
import Layout from './Layout';
import { isAuthenticated, setIsAuthenticated } from './utils/api';


const PublicRoutes = ({isAuthenticated}) => (
  <Routes>
    <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
    <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
  </Routes>
);

const ProtectedRoutes = () => (
  <Routes>
    <Route path="/companies" element={ <Layout><CompanyList/></Layout>} />
    <Route path="/users" element={ <Layout><UserList/></Layout>} />
    <Route path="/" element={ <Layout><ProjectList/></Layout>} />
  </Routes>
);

const App = () => {
  return (
    <Router>
      <PublicRoutes isAuthenticated={isAuthenticated}/>
      <ProtectedRoutes />
    </Router>
  );
};


export default App;
