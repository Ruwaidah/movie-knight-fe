import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TimeCard from "./TimeCard";
import ProgressBar from "../progress-nav-bars/ProgressBar.js";
import { timeSelectAction } from "../../features/movies/moviesSlice.js";

const TimePicker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { daySelects, movieSelect } = useSelector((state) => state.movies);
  const [timeSelect, setTimeSelect] = useState([]);
  let editeMovies = movieSelect;
  useEffect(() => {
    if (Object.keys(movieSelect).length < 1) navigate("/");
  }, []);

  for (const key in movieSelect) {
    editeMovies = {
      ...editeMovies,
      [key]: {
        ...editeMovies[key],
        showtimes: filtering(movieSelect[key].showtimes, daySelects),
      },
    };
  }
  const times = ["9-11 AM", "12-2 PM", "3-5 PM", "6-8 PM", "9-Midnight"];
  function ticketsPage() {
    dispatch(timeSelectAction({ timeSelect, editeMovies }));
    navigate("/tickets");
  }

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

function filtering(data, days) {
  const showTimefilterDate = data.filter((date) => {
    if (days.indexOf(date.dateTime.split("T")[0]) >= 0) return date;
  });
  return showTimefilterDate;
}

export default TimePicker;
