import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './Login';
import Logout from './Logout';
import ProjectList, {ProjectDetail} from './Projects';
import CompanyList, {CompanyDetail, CompanyCreate} from './Companies';
import UserList, {UserDetail} from './Users';
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
    <Route path="/companies/detail/:uuid" element={ <Layout><CompanyDetail/></Layout>} />
    <Route path="/companies/create" element={ <Layout><CompanyCreate/></Layout>} />
    <Route path="/users" element={ <Layout><UserList/></Layout>} />
    <Route path="/users/detail/:uuid" element={ <Layout><UserDetail/></Layout>} />
    <Route path="/projects" element={ <Layout><ProjectList/></Layout>} />
    <Route path="/projects/detail/:uuid" element={ <Layout><ProjectDetail/></Layout>} />
    <Route path="/" element={ <Navigate to='/projects'/>} />
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
