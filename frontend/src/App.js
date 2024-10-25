import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';

import ProjectList, {ProjectDetail, ProjectCreate, ProjectEdit} from './views/Projects';
import CompanyList, {CompanyDetail, CompanyCreate, CompanyEdit} from './views/Companies';
import UserList, {UserDetail, UserCreate, UserEdit} from './views/Users';
import Layout from './Layout';
import { isAuthenticated, setIsAuthenticated } from './utils/api';
import LoginPage from './views/Login';
import Logout from './views/Logout';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/companies" element={ <Layout><CompanyList/></Layout>} />
        <Route path="/companies/create" element={ <Layout><CompanyCreate/></Layout>} />
        <Route path="/companies/:uuid" element={ <Layout><CompanyDetail/></Layout>} />
        <Route path="/companies/:uuid/edit" element={ <Layout><CompanyEdit/></Layout>} />
        {/*<Route path="/companies/:uuid/delete" element={ <Layout><CompanyDelete/></Layout>} />*/}
        <Route path="/users" element={ <Layout><UserList/></Layout>} />
        <Route path="/users/:uuid" element={ <Layout><UserDetail/></Layout>} />
        <Route path="/users/create" element={ <Layout><UserCreate/></Layout>} />
        <Route path="/users/:uuid/edit" element ={ <Layout><UserEdit/></Layout>} />
        {/*<Route path="/users/:uuid/delete" element={ <Layout><UserDelete/></Layout>} />*/}
        <Route path="/projects" element={ <Layout><ProjectList/></Layout>} />
        <Route path="/projects/create" element={ <Layout><ProjectCreate/></Layout>} />
        <Route path="/projects/:uuid" element={ <Layout><ProjectDetail/></Layout>} />
        <Route path="/projects/:uuid/edit" element={ <Layout><ProjectEdit/></Layout>} />
        {/*<Route path="/projects/:uuid/delete" element={ <Layout><ProjectDelete/></Layout>} />*/}
        <Route path="/" element={ <Navigate to='/projects'/>} />
      </Routes>
    </Router>
  );
};


export default App;
