import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './Login';
import Logout from './Logout';
import ProjectList from './Projects';
import CompanyList from './Companies';
import UserList from './Users';
import Layout from './Layout';
import { isAuthenticated, setIsAuthenticated } from './utils/api';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={ <Layout><ProjectList/></Layout>} />
        <Route path="/companies" element={ <Layout><CompanyList/></Layout>} />
        <Route path="/users" element={ <Layout><UserList/></Layout>} />
        {/* <Route path="/" element={isAuthenticated() ? <ProjectList /> : <Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
};


export default App;
