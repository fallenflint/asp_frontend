import { Navigate } from 'react-router-dom';

const Logout = ({setIsAuthenticated}) => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    return (<Navigate to='/login'/>)
};

export default Logout;
