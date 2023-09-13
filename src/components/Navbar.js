import React, { useState, useEffect } from "react";
import "./styles/Navbar.css";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Navbar = ({ loggedUser, updateLoggedUser }) => {
  const [menuActive, setMenuActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showGreet, setShowGreet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth > 995) {
        setMenuActive(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  function handleLogout() {
    localStorage.removeItem("loggedUser");
    updateLoggedUser();
    setShow(false);
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Do You Want To Logout </Modal.Title>
        </Modal.Header>
        <Modal.Body>Click Ok to Logout</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {
            <Button className="book-button" onClick={handleLogout}>
              Ok
            </Button>
          }
        </Modal.Footer>
      </Modal>
      <nav className="navbar">
        <div className="navbar-left">
          <b>BookMySlot</b>
          {loggedUser && !showGreet && (
            <p className="greet">
              Welcome Back,
              <br />
              {loggedUser.split("@")[0]}
            </p>
          )}
        </div>
        <div className="navbar-right">
          {windowWidth <= 995 && (
            <button
              className="menu-button"
              onClick={() => setMenuActive(!menuActive)}
            >
              Menu
            </button>
          )}
          <ul
            className={`navbar-links ${menuActive ? "active" : ""}`}
            onClick={() => setMenuActive(!menuActive)}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calender">Calendar</Link>
            </li>
            {loggedUser ? (
              <>
                <li>
                  <Link to="/mybookings">My Bookings</Link>
                </li>
                <li>
                  <Link onClick={handleShow}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/signup">Sign Up</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
