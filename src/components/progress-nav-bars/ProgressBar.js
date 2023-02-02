import React from "react";
import calendar from "../images/calendar.svg";
import cart from "../images/cart.svg";
import chair from "../images/chair.svg";
import clock from "../images/clock.svg";
import movieslate from "../images/movieslate.svg";
import searchmovie from "../images/searchmovie.svg";
import tickets from "../images/tickets.svg";
import "./ProgressBar.scss";
import { withRouter } from "react-router-dom";

const ProgressBar = props => {
  return (
    <div className="progress-bar">
      <div className="inside-dev">
        <img
          id="search"
          className={props.location.pathname.slice(1, 8) === 'details' ? 'icons brightness' : 'icons'}
          src={searchmovie}
          alt="searchmovie logo"
          onClick={() => props.history.push("/")}
        />
        <div className="progress-line" />
        <img
          id="calendar"
          className={props.location.pathname.slice(1) === 'date' ? 'icons brightness' : 'icons'}
          src={calendar}
          alt="calendar logo"
          onClick={() => props.history.push("/date")}
        />
        <div className="progress-line" />
        <img
          id="clock"
          className={props.location.pathname.slice(1) === 'time' ? 'icons brightness' : 'icons'}
          src={clock}
          alt="clock logo"
          onClick={() => props.history.push("/time")}
        />
        <div className="progress-line" />
        <img
          id="tickets"
          className={props.location.pathname.slice(1) === 'tickets' ? 'icons brightness' : 'icons'}
          src={tickets}
          alt="tickets logo"
          onClick={() => props.history.push("/tickets")}
        />
        <div className="progress-line" />
        <img
          id="chair"
          className={props.location.pathname.slice(1) === 'seats' ? 'icons brightness' : 'icons'}
          src={chair}
          alt="chair logo"
          onClick={() => props.history.push("/seats")}
        />
        <div className="progress-line" />
        <img
          id="movieslate"
          className={props.location.pathname.slice(1) === 'showtime' ? 'icons brightness' : 'icons'}
          src={movieslate}
          alt="movieslate logo"
          onClick={() => props.history.push("/showtime")}
        />
        <div className="progress-line" />
        <img className="icons" src={cart} alt="cart logo" />
      </div>
    </div>
  );
};

export default withRouter(ProgressBar);
