import { Link } from 'react-router-dom'
import { AuthedUserContext } from '../../App'; // import the AuthedUserContext
import { useContext } from 'react';

const NavBar = ({ handleLogout }) => {
    const user = useContext(AuthedUserContext);
    return (
        <>
        {user ?
            <nav>
              <ul>
                <li>Welcome, { user.username }</li>
                <li><Link to='/'>Dashboard</Link></li>
                <li><Link to='' onClick={handleLogout}>LOG OUT</Link></li>
              </ul>
            </nav>
          :
            <nav>
              <ul>
                <li><Link to='/signin'>Sign In</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
              </ul>
            </nav>
          }
        </>
    )
  }
  export default NavBar;