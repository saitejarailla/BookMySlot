import React from 'react';
import './styles/Home.css';
import homePageImage from './images/book appoinment.png';
import { Link } from 'react-router-dom';

const HomePage = ({ loggedUser }) => {
  return (
    <div className="home-page">
      
      <div className="content">
        <img
          className="main-img"
          src={homePageImage}
          alt="Home"
        />
        <div className="text-container">
          <h1 className="title">BookMySlot</h1>
          <p className="description">Experience the future of hassle-free scheduling with our website, BookMySlot. No more endless emails or phone calls to book appointments. BookMySlot offers secure login, intuitive calendar views, and quick slot reservations, helping you manage your time effortlessly. Whether for work or personal needs, BookMySlot ensures you never miss a beat. Simplify your scheduling today!</p>
          {
            (loggedUser) 
            ? 
            <Link to='/calender'> <button className='getStartedButton' >Start Booking</button></Link> 
            :
            <Link to='/signup'> <button className='getStartedButton' >Get Started</button></Link> 
          }
        </div>
      </div>
    </div>
  );
};

export default HomePage;
