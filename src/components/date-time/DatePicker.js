import React, { useState } from "react";
import DayCard from "./DayCard";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dayNext } from "../../features/users/usersSlice";
import ProgressBar from "../progress-nav-bars/ProgressBar.js";
import "../../App.scss";

export const DatePicker = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [daySelect, setDaySelect] = useState([]);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  function timePage() {
    dispatch(dayNext(daySelect));
    navigate("/time");
  }

  return (
    <div className="dayPicker-com">
      <div className="day-container">
        <h2 className="question">When would you like to go?</h2>

        <div className="days" data-testid="days">
          {days.map((day, i) => {
            return (
              <DayCard
                key={i}
                day={day}
                index={i}
                daySelect={daySelect}
                setDaySelect={setDaySelect}
              />
            );
          })}
        </div>
      </div>
      {daySelect.length === 0 ? (
        <div className="black-box">
          <button className="next-button">Next</button>
        </div>
      ) : (
        <div className="black-box">
          <button className="next-button-active" onClick={timePage}>
            Next
          </button>
        </div>
      )}
      <ProgressBar />
    </div>
  );
};

export default DatePicker