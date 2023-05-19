import React,{useContext} from 'react';
import { Link} from "react-router-dom";
import {UserContext} from '../../App'
const Chackout = (props) => {
 const [logInUser, setLogInUser] = useContext(UserContext)
    return (
        <div>
        {logInUser.name}
      
        </div>
    );
};

export default Chackout;