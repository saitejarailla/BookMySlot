// HomePage.js

import React from 'react';
import './styles/Home.css';
import homePageImage from './images/calender.jpg';
import { Link } from 'react-router-dom';

const HomePage = ({ loggedUser }) => {
  return (
    <div className="home-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="image-container">
              <img className="main-img img-fluid w-100" src={homePageImage} alt="Home" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-container">
              <h1 className="title">BookMySlot</h1>
              <p className="description">Discover the seamless scheduling experience of our platform, BookMySlot. Say goodbye to the days of endless email exchanges or time-consuming phone calls to arrange appointments. BookMySlot provides a secure login, user-friendly calendar views, and swift slot reservations, streamlining your time management effortlessly. Whether for professional or personal commitments, BookMySlot guarantees you stay organized and never miss an important moment. Simplify your scheduling process today!</p>
              {loggedUser ? (
                <Link to='/calender'><button className='getStartedButton'>Start Booking</button></Link>
              ) : (
                <Link to='/signup'><button className='getStartedButton'>Get Started</button></Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;