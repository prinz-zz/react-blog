

import Topbar from './Components/topbar/Topbar';
import Login from './Pages/login/Login';
import Register from './Pages/register/Register';
import Settings from './Pages/settings/Settings';
import Write from './Pages/write/Write';
import Single from './Pages/single/Single';
import Home from './Pages/home/Home';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useContext } from 'react';
import { Context } from './context/context';


function App() {

  const {user} = useContext(Context) ;

  return (
    <BrowserRouter>
      <Topbar/>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/login' element={ user ? <Home /> : <Login />} /> 
        <Route path='/register' element={user ? <Home /> : <Register />} /> 
        <Route path='/write' element={user ? <Write/> : <Register />} /> 
        <Route path='/settings' element={user ? <Settings/> : <Register />} /> 
        <Route path='/post/:id' element={<Single/>} /> 
     </Routes>
    </BrowserRouter>
  );
}

export default App;
