import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TimeCard from "./TimeCard";
import ProgressBar from "../progress-nav-bars/ProgressBar.js";
import { timeSelectAction } from "../../features/movies/moviesSlice.js";

const TimePicker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timeSelect, setTimeSelect] = useState([]);

  const times = ["9-11 AM", "12-2 PM", "3-5 PM", "6-8 PM", "9-Midnight"];

  function ticketsPage() {
    dispatch(timeSelectAction(timeSelect));
    navigate("/tickets");
  }
console.log(timeSelect)
  return (
    <div className="timePicker-com">
      <div className="time-container">
        <h2 className="question">What time would you like to go?</h2>

        <div className="days">
          {times.map((time, i) => {
            return (
              <TimeCard
                key={i}
                time={time}
                index={i}
                timeSelect={timeSelect}
                setTimeSelect={setTimeSelect}
              />
            );
          })}
        </div>
      </div>
      {timeSelect.length === 0 ? (
        <div className="black-box">
          <button className="next-button">Next</button>
        </div>
      ) : (
        <div className="black-box">
          <button className="next-button-active" onClick={ticketsPage}>
            Next
          </button>
        </div>
      )}
      <ProgressBar />
    </div>
  );
};

export default TimePicker;
