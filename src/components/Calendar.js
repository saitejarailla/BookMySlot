import React, { useState, useEffect } from "react";
import "./styles/Calendar.css"; // Import your CSS file
import Login from "./Login";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Calendar({ loggedUser }) {
  // Function to generate an array of days in a month

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [AvailableSlots, setAvailableSlots] = useState(0);
  const timeSlots = [
    "9:30 AM - 10:30 AM",
    "10:30 AM - 11:30 AM",
    "11:30 AM - 12:30 PM",
    "12:30 PM - 1:30 PM",
    "1:30 PM - 2:30 PM",
    "2:30 PM - 3:30 PM",
    // ... Add more time slots as needed
  ];
  const yearsList = [
    new Date().getFullYear(),
    new Date().getFullYear() + 1,
    new Date().getFullYear() + 2,
    new Date().getFullYear() + 3,
  ];

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [allBookedSlots, setAllBookedSlots] = useState(null);
  const [bookingUpdated, setBookingUpdated] = useState(false);


  const getAvailableSlotsCount = (year, month, date) => {
    if (allBookedSlots !== null) {
      const bookedSlotsForDate = allBookedSlots.filter(
        bookedSlot =>
          bookedSlot.year === year &&
          bookedSlot.month === month &&
          bookedSlot.date === date
      );
      return timeSlots.length - bookedSlotsForDate.length>=0?timeSlots.length - bookedSlotsForDate.length:0;
    }
    return timeSlots.length; // Return maximum available slots if allBookedSlots is null
  };

  useEffect(() => {
    fetch(`https://backend-ya1p.onrender.com/get-booking`)
      .then((response) => response.json())
      .then((data) => {
        setAllBookedSlots(data.payload);
        console.log(allBookedSlots);
      })
      .catch((error) => {
        console.error("Error in getting booking data:", error);
      });
  }, [bookingUpdated]);

  // Function to check if a date is before the current date
  const isDateDisabled = (year, month, day) => {
    const currentDate = new Date();
    if (allBookedSlots !== null) {
      const bookedSlotsForDate = allBookedSlots.filter(
        (bookedSlot) =>
          bookedSlot.year === year &&
          bookedSlot.month === month+1 &&
          bookedSlot.date === day
      );
      console.log(currentDate,month)
      return new Date(year, month, day) < currentDate || bookedSlotsForDate.length === timeSlots.length;     
    }
    return false;

  };

  const [expandedDate, setExpandedDate] = useState(null);

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const handleDateClick = (date) => {
    if (!isDateDisabled(selectedYear, selectedMonth, date)) {
      if (expandedDate === date) {
        // Toggle the expanded date when clicking again on the same date
        setExpandedDate(null);
      } else {
        setExpandedDate(date);
        handleShow();
      }
      setSelectedDate(date);
      setSelectedSlot(null);
    }
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const isSlotBooked = (year, month, date, slot) => {
    if (allBookedSlots !== null) {
      console.log("Checking:", year, month, date, slot);
      return allBookedSlots.some(
        (bookedSlot) =>
          bookedSlot.year === year &&
          bookedSlot.month === month &&
          bookedSlot.date === date &&
          bookedSlot.slot === slot
      );
    }
    return false; // Return false if allBookedSlots is null
  };

  const isDateFullyBooked = (year, month, date) => {
    if (allBookedSlots !== null) {
      const bookedSlotsForDate = allBookedSlots.filter(
        (bookedSlot) =>
          bookedSlot.year === year &&
          bookedSlot.month === month &&
          bookedSlot.date === date
      );
      return bookedSlotsForDate.length >=4 && bookedSlotsForDate.length !=6;
     
    }
    return false; // Return false if allBookedSlots is null
  };

  const isDatePartiallyBooked = (year, month, date) => {
    if (allBookedSlots !== null) {
      const bookedSlotsForDate = allBookedSlots.filter(
        (bookedSlot) =>
          bookedSlot.year === year &&
          bookedSlot.month === month &&
          bookedSlot.date === date
      );
      return (
        bookedSlotsForDate.length <4  &&
        bookedSlotsForDate.length >0
      );
    }
    return false; // Return false if allBookedSlots is null
  };


  const[buttonClicked,setButtonClicked] = useState(false);
  const handleBooking = () => {
    setButtonClicked(true);
    if (selectedDate !== null && selectedSlot !== null) {
      const bookingData = {
        user: loggedUser,
        year: selectedYear,
        month: selectedMonth + 1,
        date: selectedDate,
        slot: timeSlots.indexOf(selectedSlot) + 1, // Get the index of the selected slot
      };

      fetch(`https://backend-ya1p.onrender.com/post-booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Update allBookedSlots with the newly booked slot
          setAllBookedSlots((prevBookedSlots) => [
            ...prevBookedSlots,
            {
              year: selectedYear,
              month: selectedMonth + 1,
              date: selectedDate,
              slot: timeSlots.indexOf(selectedSlot) + 1,
            },
          ]);

          setBookingUpdated(true);
          console.log("Booking response:", data);
          
          // Clear selected slot and date
          setSelectedSlot(null);
          setSelectedDate(null);
          handleClose();
          setButtonClicked(false);
        })
        .catch((error) => {
          console.error("Error in booking:", error);
        });
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSelectedDate(null);
  };
  const handleShow = () => setShow(true);

  console.log(allBookedSlots);

  return (
    <>
      <>
        {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Select a Time Slot on {expandedDate}/{selectedMonth + 1}/
              {selectedYear}
            </Modal.Title>:
            
          </Modal.Header>
          <Modal.Body>
            <div className="slot-options">
              {timeSlots.map((slot, index) => (
                <label
                  key={index}
                  className={`slot-option ${
                    isSlotBooked(
                      selectedYear,
                      selectedMonth + 1,
                      expandedDate,
                      index + 1
                    )
                      ? "disabled"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="timeSlot"
                    value={slot}
                    checked={selectedSlot === slot}
                    onChange={() => handleSlotSelect(slot)}
                    disabled={isSlotBooked(
                      selectedYear,
                      selectedMonth + 1,
                      expandedDate,
                      index + 1
                    )}
                  />
                  {slot}
                </label>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {selectedSlot !== null && (
              <Button className="book-button" onClick={handleBooking} disabled = {buttonClicked}>
                Book Slot
              </Button>
            )}
          </Modal.Footer>
        </Modal>
        

        

      </>
      {loggedUser ? (
        <div className="calendar-container">
          <div
            className={`calendar ${expandedDate !== null ? "expanded" : ""}`}
          >
            <div className="calendar-header">
              <div className="year-selector">
                <label htmlFor="year">Select Year: </label>
                <select
                  id="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                  {yearsList.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="controls">
                {months.map((month, index) => (
                  <div
                    key={index}
                    className={`month-cell ${
                      index === selectedMonth ? "selected" : ""
                    }`}
                    onClick={() => handleMonthClick(index)}
                  >
                    {month}
                  </div>
                ))}
              </div>
            </div>
            <div className="date-grid">
              {[
                ...Array(getDaysInMonth(selectedYear, selectedMonth)).keys(),
              ].map((day) => (
                <div
                  key={day}
                  className={`date-cell
              ${day + 1 === selectedDate ? "selected" : ""}
              ${
                isDateDisabled(selectedYear, selectedMonth, day + 1)
                  ? "disabled"
                  : ""
              }
              ${
                isDateFullyBooked(selectedYear, selectedMonth + 1, day + 1)
                  ? "fully-booked"
                  : ""
              }
              ${
                isDatePartiallyBooked(
                  selectedYear,
                  selectedMonth + 1,
                  day + 1
                ) && !isDateDisabled(selectedYear, selectedMonth, day + 1)
                  ? "partially-booked"
                  : ""
              }
            `}
                  onClick={() => handleDateClick(day + 1)}
                >
                  {day + 1}<br></br>
                  {isDateDisabled(selectedYear,selectedMonth,day+1)?<p>Closed</p>:(
                  <p>Available: {getAvailableSlotsCount(selectedYear,selectedMonth+1,day+1)}</p>)}
                </div>
              ))}
            </div>
          </div>
          <div>

          </div>
        </div>
      ) : (
        
        <div>
          <h3>Login to start booking</h3>
          <Login></Login></div>
      )}
    </>
  );
}

export default Calendar;
