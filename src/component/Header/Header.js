import React,{useContext} from 'react';
import {UserContext} from '../../App'
import logo from '../../images/logo.png';
import { Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';

const Header = () => {
    const [logInUser, setLogInUser] = useContext(UserContext)
  
    return (
        <div className='head' >
           <div className="header">
           <img src={logo} alt="" />
           </div>
           <nav>
             <Link to="">Shop</Link>
               <Link to="activity">Activity</Link>
                 <Link to="reveiw">Reveiw</Link> 
                  {logInUser.name ? <Link to="account">{logInUser.name}</Link> :
                  <Link to="login">Login</Link> 
              }
                  
           
            </nav>

        </div>
    );
};

export default Header;