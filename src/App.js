import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import Chackout from './component/Chackout/Chackout';
import Account from './component/Account/Account';
import Reveiw from './component/Reveiw/Reveiw';
import Login from './component/Login/Login';
import { BrowserRouter , Routes, Route , Navigate} from "react-router-dom";
import { createContext, useState } from 'react';
//import ReactDOM from 'react-dom';
export const UserContext = createContext();
function App() {
  const [logInUser, setLogInUser] = useState({})
  return (
   <UserContext.Provider value={[logInUser, setLogInUser]}>
  <BrowserRouter>
  <Header/>
     <Routes>
         <Route path="/" element={ <Shop/> } />
      <Route element={<PrivateRoute/>}>
            <Route path="/chackout" element={<Chackout/>}  />} />
            <Route path="/reveiw" element={ <Reveiw/> } />
             <Route path="/account" element={ <Account/> } />
          </Route>
           <Route path="/login" element={ <Login/> } />
      </Routes>
  </BrowserRouter>
 </UserContext.Provider>
  );
}

export default App;
