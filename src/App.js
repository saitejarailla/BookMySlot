import React, { useState , useEffect } from 'react';
import HomePage from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Calendar from './components/Calendar';
import { Route, Routes } from 'react-router-dom';
import MyBookings from './components/MyBookings';
import {useNavigate} from 'react-router-dom'

function App() {
  const [loggedUser, setLoggedUser] = useState();
  const navigate = useNavigate()

  // Function to update the loggedUser state
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      setLoggedUser(storedUser);
    }
  }, []);

  const updateLoggedUser = (userEmail) => {
    if (userEmail) {
      setLoggedUser(userEmail);
      localStorage.setItem('loggedUser', userEmail);
    } else {
      setLoggedUser(''); // Log out, set to an empty string
      navigate("/home")
      localStorage.removeItem('loggedUser');
    }
  };

  console.log(loggedUser)

  return (
    <div>
      <Navbar loggedUser={loggedUser} updateLoggedUser={updateLoggedUser}/>
      <Routes>
        <Route path='' element={<HomePage loggedUser={loggedUser}/>} />
        <Route path='/home' element={<HomePage loggedUser={loggedUser}/>} />
        <Route path='/login' element={<Login updateLoggedUser={updateLoggedUser} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/calender' element={<Calendar loggedUser={loggedUser}/>} />
        <Route path='/mybookings' element={<MyBookings loggedUser={loggedUser}/>} />
      </Routes>
    </div>
  );
}

export default App;
