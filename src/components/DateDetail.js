import React from 'react';

function DateDetail({ date }) {
  // Fetch available time slots for the selected date
  const availableTimeSlots = []; // Array of available time slots

  return (
    <div>
      <h2>{date}</h2>
      <ul>
        {availableTimeSlots.map(slot => (
          <li key={slot}>{slot}</li>
        ))}
      </ul>
    </div>
  );
}

export default DateDetail;

