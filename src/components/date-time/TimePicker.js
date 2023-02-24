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

  useEffect(() => {
    if (Object.keys(movieSelect).length < 1) navigate("/");
  }, []);
  console.log(daySelects);
  for (const key in movieSelect) {
    // console.log(filtering(movieSelect[key].showtimes, daySelects));
    movieSelect[key].showtimes = filtering(
      movieSelect[key].showtimes,
      daySelects
    );
  }
  const times = ["9-11 AM", "12-2 PM", "3-5 PM", "6-8 PM", "9-Midnight"];
  console.log(daySelects, movieSelect);
  function ticketsPage() {
    dispatch(timeSelectAction(timeSelect));
    navigate("/tickets");
  }
  // console.log(timeSelect);

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
  // console.log(days);
  const showTimefilterDate = data.filter(
    (date) => {
      //  const newDays =    days.filter((day) => day[2] === date.dateTime.split("T")[0]);
      const getDays = days.filter((day) => {
        // console.log(day[2])
        console.log(day[2], date.dateTime.split("T")[0]);
        return day[2] === date.dateTime.split("T")[0];
      });
      console.log(getDays[0]);
      console.log(getDays, date.dateTime.split("T")[0]);
      if (getDays.length === 1)
        return getDays[0][2] === date.dateTime.split("T")[0];
      //  const newDays = days.filter(day => {
      //   if (day === date.dateTime.split("T")[0])
      //   {...date, }
      //  })
    }

    //  const days =  dates.includes(date.dateTime.split("T")[0])
  );
  console.log(showTimefilterDate);
  // showTimefilterDate = showTimefilterDate.filter(time => times.includes(Number(time.dateTime.split("T")[1].split(":")[0])))
  // return showTimefilterDate
  return showTimefilterDate;
}

export default TimePicker;
