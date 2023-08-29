import React from 'react';
import './styles/Navbar.css';
import icon from './images/icon.jpg';
import { Link } from 'react-router-dom';

const Navbar = ({ loggedUser ,  updateLoggedUser}) => {
  function handleLogout() {
    if(window.confirm("Click OK to Logout")){
      localStorage.removeItem('loggedUser'); // Clear user data from local storage
      updateLoggedUser();
    }
  };
  return (
    <>
      {loggedUser ? ( // If user is logged in
        <nav className="navbar">
          <div className="navbar-left">
            <img className="navbar-icon" src={icon} alt="Icon" />
          </div>
          <p className='greet'>Hello, {loggedUser.split('@')[0]}</p>
          <div className="navbar-right">
            <ul className="navbar-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/calender">Calendar</Link></li>
              <li><Link to="/mybookings">My Bookings</Link></li>
              <li><Link onClick={handleLogout}>Logout</Link></li>
            </ul>
          </div>
        </nav>
      ) : ( // If user is not logged in
        <nav className="navbar">
          <div className="navbar-left">
            <img className="navbar-icon" src={icon} alt="Icon" />
          </div>
          <div className="navbar-right">
            <ul className="navbar-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/calender">Calendar</Link></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Sign Up</a></li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
