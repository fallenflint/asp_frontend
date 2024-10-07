import { Link } from 'react-router-dom';
import ASPNavBar from './Navbar';


const Layout = ({children}) => {

    return (
        <div>
          <header>
            <ASPNavBar/>
          </header>
          <main>{children}</main>
          <footer>
            <p>© 2024 T.F.G</p>
          </footer>
        </div>
  );
};


export default Layout;