import { Link } from 'react-router-dom';
import ASPNavBar from './Navbar';


const Layout = ({children}) => {

    return (
        <div>
          <header>
            <ASPNavBar/>
          </header>
          <main>{children}</main>
          <footer style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
            <div>© 2024 T.F.G</div>
          </footer>
        </div>
  );
};


export default Layout;