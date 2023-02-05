import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieList from "./MovieList";
import "./dashboard.scss";
import UpComingMovies from "./UpComingMovies.js";
import { useNavigate } from "react-router-dom";
import { movieNext } from "../../features/users/usersSlice";

export const Dashboard = () => {
  console.log("ewfwfwfw")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { NextButton, MovieSelects } = useSelector((state) => state.users);
  const [movieSelect, setMovieSelect] = useState([]);
  console.log(movieSelect)
  function DatePage() {
    dispatch(movieNext(movieSelect));
    navigate("/date");
  }

  return (
    <div className="dash-board" data-testid="dash-board">
      <div className="titles">
        <h1 className="header-dash">Select the movies you'd like to see</h1>
      </div>
      <MovieList movieSelect={movieSelect} setMovieSelect={setMovieSelect} />
      <UpComingMovies />

      {NextButton ? (
        <div className="black-box">
          <button
            data-testid="next-btn"
            className="next-button-enable"
            onClick={DatePage}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
