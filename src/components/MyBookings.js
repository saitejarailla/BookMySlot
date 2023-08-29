import React, { useState, useEffect } from 'react';
import './styles/MyBookings.css'; // Import your CSS file

function MyBookings({ loggedUser }) {
  const [bookings, setBookings] = useState([]);

  const slots = {'1':"9:30 AM - 10:30 AM",
  '2':"10:30 AM - 11:30 AM",
  '3':"11:30 AM - 12:30 PM",
  '4':"12:30 PM - 1:30 PM",
  '5':"1:30 PM - 2:30 PM",
  '6':"2:30 PM - 3:30 PM"}

  useEffect(() => {
    fetch(`https://backend-ya1p.onrender.com/get-booking`)
      .then((response) => response.json())
      .then((data) => {
        const userBookings = data.payload.filter(
          booking => booking.user === loggedUser
        );
        setBookings(userBookings);
      })
      .catch((error) => {
        console.error('Error in getting bookings data:', error);
      });
  }, [loggedUser]);

  const handleDeleteBooking = (bookingId) => {
    console.log(bookingId)
    fetch(`https://backend-ya1p.onrender.com/delete-booking/${bookingId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      // Remove the deleted booking from the state
      setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
    })
    .catch(error => {
      console.error('Error in deleting booking:', error);
    });
  };

  return (
    <div className="my-bookings-container">
      <h1>My Bookings</h1>
      {bookings.length === 0 || !loggedUser ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-cards">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <h2>Booking Details</h2>
              <p>Date: {booking.date}/{booking.month}/{booking.year}</p>
              <p>Slot: {slots[booking.slot]}</p>
              <button
                className="delete-button"
                onClick={() => handleDeleteBooking(booking._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
