import React,{useState,useContext} from 'react';
import { useHistory ,useLocation, useNavigate} from "react-router-dom";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App'
import './Login.css'
import { initializeApp } from "firebase/app";
import { getAuth,updateProfile, signInWithPopup,FacebookAuthProvider, GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword ,signOut} from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.css';
initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();



const App = () =>{
   const history = useNavigate() ;
    const location = useLocation() 
    let { from } = location.state || { from: {pathname: "/" } };

 const [user,setUser]= useState({
     isSignIn: false ,
     name:'',
     email: '',
     password: '',
     photo: '',
      gLogInSuccess: false,
      userError: '' ,
 })

 //
 const [signUser , setSignUser]=useState({
     email: '',
     password: '',
     error: false,
     success: false
 })
const [logInUser, setLogInUser] = useContext(UserContext)
const handelGoogleSignUp  =()=>{
 const auth = getAuth();
signInWithPopup(auth, provider)
.then(res => {
  const {displayName,email,photoURL}= res.user ;
   const copyUserInfo = {...signUser};
  copyUserInfo.success = false ;
  copyUserInfo.error = false ;
    setSignUser(copyUserInfo)
  const setResData={
     name:displayName,
     email: email,
     photo: photoURL,
      gLogInSuccess: true,
      userError: false ,
      userSuccess: false
  }
  setUser(setResData)
  setLogInUser(setResData )
 history(from) ;
})
.catch(error => {
console.log(error)
})

}

const handelFacebookSignUp= ()=>{
const auth = getAuth();
signInWithPopup(auth, fbProvider)
.then(res=>{
  console.log(res.user)
})
.catch(error =>{
  console.log(error.message)
})

}
/*const googleSignOut = ()=>{
const auth = getAuth()
signOut(auth)
.then(res => {
   const setResData={
    isSignIn: false ,
     name:'',
     email: '',
     photo: '',
    gLogOutSuccess:true ,
     gLogInSuccess: false,
  }
  setUser(setResData)
})
}*/


const handelInputField = (e)=>{
  let formValid =true ;
  if(e.target.name === 'name'){
    formValid = e.target.value ;
  }
 if(e.target.name === 'email'){
    formValid = /\S+@\S+\.\S/.test(e.target.value)
    
  }
   if(e.target.name === 'password'){
    const length = e.target.value.length >=6 ;
    const validation = /\d{1}/.test(e.target.value)
    formValid = length && validation ;
  }
  
  if(formValid){
    const copyUserInfo = {...user};
    copyUserInfo[e.target.name] = e.target.value ;
        setUser(copyUserInfo)
    
  }
    
}

const signUp = (e)=>{
  e.preventDefault()
  if(user.name !== '' && user.email !== '' && user.password !== ''){
 
  const auth = getAuth();
createUserWithEmailAndPassword(auth, user.email, user.password)
.then(res =>{
  updateSignUpName(user.name)
   const newUserInfo = {...user}
   newUserInfo.userSuccess = true ;
newUserInfo.userError = "" ;
newUserInfo.isSignIn = true ;
newUserInfo.gLogInSuccess = false ;
setUser(newUserInfo)

const copyUserInfo = {...signUser};
  copyUserInfo.success = false ;
  copyUserInfo.error = '' ;
    setSignUser(copyUserInfo)

})
.catch(error =>{
  const copyUserInfo = {...signUser};
  copyUserInfo.error = '' ;
  copyUserInfo.success = false ;
    setSignUser(copyUserInfo)

const newUserInfo = {...user}
newUserInfo.userError = error.code ;
newUserInfo.userSuccess = false ;
newUserInfo.gLogInSuccess =false
setUser(newUserInfo)
})
  }
}

const updateSignUpName = name =>{
  const auth = getAuth();
updateProfile(auth.currentUser, {
  displayName: name
})
.then(res =>{

})
.catch(err =>{

})

}
const Sign = name=>{
  const newUserInfo = {...user}
newUserInfo.isSignIn = true ;
setUser(newUserInfo)
}
const Signup = name=>{
  const newUserInfo = {...user}
newUserInfo.isSignIn = false ;
setUser(newUserInfo)
}


const signInFeild = (e)=>{
  let formValid = true ;
  if(e.target.name === 'email'){
    formValid = /\S+@\S+\.\S/.test(e.target.value)
    
  }
   if(e.target.name === 'password'){
    const length = e.target.value.length >=6 ;
    const validation = /\d{1}/.test(e.target.value)
    formValid = length && validation ;
  }
  if(formValid){
    const copyUserInfo = {...signUser};
    copyUserInfo[e.target.name] = e.target.value ;
        setSignUser(copyUserInfo)
    
  }
}
const signInHandel = (e)=>{
  e.preventDefault()
  const auth = getAuth();
signInWithEmailAndPassword(auth, signUser.email, signUser.password)
.then(res => {
  const {displayName,email,photoURL}= res.user ;
  const resData ={
     name:displayName,
     email: email,
     photo: photoURL
  }
  setLogInUser(resData);
  history(from) ;
  const copyUserInfo = {...signUser};
  copyUserInfo.success = true ;
  copyUserInfo.error = false ;
    setSignUser(copyUserInfo)
 
      const newUserInfo = {...user}
   newUserInfo.userSuccess = false ;
   newUserInfo.gLogInSuccess = false ;
newUserInfo.userError = "" ;
newUserInfo.gLogInSuccess = false ;
setUser(newUserInfo)
})
.catch(error => {

      const newUserInfo = {...user}
      newUserInfo.userError = "" ;
      newUserInfo.gLogInSuccess = false ;
   newUserInfo.userSuccess = false ;
      setUser(newUserInfo)
 const copyUserInfo = {...signUser};
  copyUserInfo.success = false ;
  copyUserInfo.error = error.code ;
    setSignUser(copyUserInfo)
})
}
return (
    <div className="main">
  <div className="App d-flex ">


    <div className="signIn m-auto my-3">
      <h5 className='Title'>Programmer Zobayer</h5>
      {user.gLogInSuccess && <p className='text-success text-center '>Google User Log In Success</p>
    }
   
   <p className='text-danger text-center '>{user.userError}</p>
   <p className='text-danger text-center '>{signUser.error}</p>
    {signUser.success && <p className='text-success text-center '>Loged In Successfully</p>}
   {user.userSuccess && <p className='text-success text-center '>Account Created Successfully</p>}
      
      {!user.isSignIn  && <form id=''>
        <input type="text"  name="name" onBlur={handelInputField} placeholder='Type Your Name'/>
        <br />
        <input type="email" name="email" onBlur={handelInputField}  placeholder='Type Your Email'/>
        <br />
        <input type="password" name="password" onBlur={handelInputField} placeholder='Type Your Password'/>
        <br />
        <input type="submit" value="Sign Up" onClick={signUp} />
      </form>}
     {user.isSignIn  &&  <form >
        <input type="email" name="email" onBlur={signInFeild}   placeholder='Type Your Email'/>
        <br />
        <input type="password" name="password" onBlur={signInFeild}  placeholder='Type Your Password'/>
        <br />
        <input type="submit" value="Sign In" onClick={signInHandel} />
      </form>}
      <div className="rap text-center">
      <div className="underline my-4 "></div>
      {user.isSignIn ?  <h5 className="sign" onClick={Signup} >Sign Up</h5> :
      <h5 className="sign" onClick={Sign}>Sign In</h5>
    }
      
      </div>
      <div className="buttons">
        <button onClick={handelFacebookSignUp}>Facebook</button>
        
         <button onClick={handelGoogleSignUp}>Google</button>
        
        
      </div>
    </div>


  </div>
  
  </div>
  );
}

export default App;
