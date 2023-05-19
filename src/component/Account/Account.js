import React,{useContext} from 'react';
import { Link} from "react-router-dom";
import {UserContext} from '../../App'

const Chackout = (props) => {
 const [logInUser, setLogInUser] = useContext(UserContext)
 const signOut =()=>{
     const rest={
     name:'',
     email: '',
     photo: '',
  }
   setLogInUser(rest)
 }
    return (
        <div>
        {logInUser.name}
        <br/>
        <img src={logInUser.photo} alt=""></img>
        <button onClick={signOut}>Sign Out </button>
        </div>
    );
};

export default Chackout;