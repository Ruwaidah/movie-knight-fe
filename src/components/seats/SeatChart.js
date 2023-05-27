import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSeats } from "../../features/movies/moviesSlice";
// import axios from "axios";
import "./seatChart.scss";
import Loading from "../Loading";
import screen from "../images/screen.svg";
import ProgressBar from "../progress-nav-bars/ProgressBar.js";
import { seatsArea } from "../../features/movies/moviesSlice";
import SeatsCard from "./SeatsCard.js";

const Seatchart = () => {
  const { seats, movieSelect } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [seatsSelect, setSeatSelect] = useState({
    front: [],
    left: [],
    middle: [],
    right: [],
    end: [],
  });
  console.log(movieSelect)

  useEffect(() => {
    if (Object.keys(movieSelect).length < 1) navigate("/");
    dispatch(getSeats(movieSelect));
  }, []);

  function showtimePage() {
    dispatch(seatsArea(seatsSelect));
    navigate("/showtime");
  }

  if (!seats) {
    return <Loading />;
  } else {
    return (
      <div className="seats-com">
        <div className="seat-container">
          {/* <h1 className="seat-title">Where would you like to sit?</h1> */}
          <h1 className="seat-header">
            Select the area in which you’d like to sit
          </h1>
          <div className="seat-chart">
            <img className="screen" src={screen} alt="movie theater screen" />
            <SeatsCard
              seats={seats}
              setSeatSelect={setSeatSelect}
              seatsSelect={seatsSelect}
            />
          </div>
          {seatsSelect.front.length <= 0 &&
          seatsSelect.left.length <= 0 &&
          seatsSelect.middle.length <= 0 &&
          seatsSelect.right.length <= 0 &&
          seatsSelect.end.length <= 0 ? (
            <div className="black-box">
              <button className="next-button seats-next">Next</button>
            </div>
          ) : (
            <div className="black-box">
              <button
                className="next-button-active seats-next"
                onClick={showtimePage}
              >
                Next
              </button>
            </div>
          )}
        </div>
        <ProgressBar />
      </div>
    );
  }
};

export default Seatchart;
