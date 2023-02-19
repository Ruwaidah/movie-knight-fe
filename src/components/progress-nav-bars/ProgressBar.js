import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import calendar from "../images/calendar.svg";
import cart from "../images/cart.svg";
import chair from "../images/chair.svg";
import clock from "../images/clock.svg";
import movieslate from "../images/movieslate.svg";
import searchmovie from "../images/searchmovie.svg";
import tickets from "../images/tickets.svg";
import "./ProgressBar.scss";
// import { withRouter } from "react-router-dom";

const ProgressBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  return (
    <div className="progress-bar">
      <div className="inside-dev">
        <img
          id="search"
          className={
            pathname.slice(1, 8) === "details" ? "icons brightness" : "icons"
          }
          src={searchmovie}
          alt="searchmovie logo"
          onClick={() => navigate("/")}
        />
        <div className="progress-line" />
        <img
          id="calendar"
          className={
            pathname.slice(1) === "date" ? "icons brightness" : "icons"
          }
          src={calendar}
          alt="calendar logo"
          // onClick={() => navigate("/date")}
        />
        <div className="progress-line" />
        <img
          id="clock"
          className={
            pathname.slice(1) === "time" ? "icons brightness" : "icons"
          }
          src={clock}
          alt="clock logo"
          // onClick={() => navigate("/time")}
        />
        <div className="progress-line" />
        <img
          id="tickets"
          className={
            pathname.slice(1) === "tickets" ? "icons brightness" : "icons"
          }
          src={tickets}
          alt="tickets logo"
          // onClick={() => navigate("/tickets")}
        />
        <div className="progress-line" />
        <img
          id="chair"
          className={
            pathname.slice(1) === "seats" ? "icons brightness" : "icons"
          }
          src={chair}
          alt="chair logo"
          // onClick={() => navigate("/seats")}
        />
        <div className="progress-line" />
        <img
          id="movieslate"
          className={
            pathname.slice(1) === "showtime" ? "icons brightness" : "icons"
          }
          src={movieslate}
          alt="movieslate logo"
          // onClick={() => navigate("/showtime")}
        />
        <div className="progress-line" />
        <img className="icons" src={cart} alt="cart logo" />
      </div>
    </div>
  );
};

export default ProgressBar;
