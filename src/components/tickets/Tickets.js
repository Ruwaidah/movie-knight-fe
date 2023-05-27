import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./tickets.scss";
import { useNavigate } from "react-router-dom";
import { ticketsNum } from "../../features/movies/moviesSlice.js";
import ProgressBar from "../progress-nav-bars/ProgressBar.js";

const Tickets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movieSelect } = useSelector((state) => state.movies);
  const [ticket, setTicket] = useState(1);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (Object.keys(movieSelect).length < 1) navigate("/");
  }, []);




  function seatPage() {
    dispatch(ticketsNum(ticket));
    navigate("/seats");
  }

  function toggleClass() {
    const currentState = active;
    setActive(!currentState);
  }
  return (
    <div className="tickets-com">
      <div className="ticket">
        <h2 className="title">How many tickets do you need?</h2>

        {ticket <= 0 ? (
          <div className="ticket-select">
            <h3 className="ticket-num no-sub">{ticket}</h3>
            <button className="math" onClick={() => setTicket(ticket + 1)}>
              +
            </button>
          </div>
        ) : (
          <div className="ticket-select">
            <button className="math" onClick={() => setTicket(ticket - 1)}>
              -
            </button>
            <h3 className="ticket-num">{ticket}</h3>
            <button className="math" onClick={() => setTicket(ticket + 1)}>
              +
            </button>
          </div>
        )}

        <h3 className="sub-title">
          Would you like the seats to be next to each other?
        </h3>

        <div className="yes-no-option">
          <button
            className={active ? "no button" : "button no-off"}
            onClick={() => toggleClass()}
          >
            No
          </button>
          <button
            className={active ? "button yes" : "button yes-off"}
            onClick={() => toggleClass()}
          >
            Yes
          </button>
        </div>
        {ticket <= 0 ? (
          <button className="next-off button">Next</button>
        ) : (
          <button className="next button" onClick={seatPage}>
            Next
          </button>
        )}
      </div>
      <div className="progress-center">
        <ProgressBar />
      </div>
    </div>
  );
};

function changingTimeFormat(times) {
  let timeFormat = [];
  times.map((time) => {
    for (let i = 0; i < 3; i++) {
      if (time.includes("AM")) timeFormat.push(Number(time.split("-")[0]) + i);
      else if (time.includes("PM")) {
        if (time.split("-")[0] == 12)
          timeFormat.push(Number(time.split("-")[0]) + i);
        else timeFormat.push(Number(time.split("-")[0]) + i + 12);
      } else timeFormat.push(21 + i);
    }
  });
  return timeFormat;
}

export default Tickets;
