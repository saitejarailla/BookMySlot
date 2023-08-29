import React from 'react';

function Booking({ timeSlot }) {
  const handleBooking = () => {
    // Handle booking logic (e.g., send booking request to server)
  };

  return (
    <div>
      <h2>Booking</h2>
      <p>Selected Time Slot: {timeSlot}</p>
      <button onClick={handleBooking}>Book Appointment</button>
    </div>
  );
}

export default Booking;
