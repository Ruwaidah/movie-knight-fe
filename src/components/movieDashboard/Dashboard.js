import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoviesList from "./MoviesList";
import "./dashboard.scss";
import UpComingMovies from "./UpComingMovies.js";
import { useNavigate } from "react-router-dom";
import { movieNext } from "../../features/users/usersSlice";
import { movieSelect } from "../../features/movies/moviesSlice.js";
export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { NextButton } = useSelector((state) => state.users);
  // const [movieSelect, setMovieSelect] = useState([]);
  function DatePage() {
    // dispatch(movieNext(movieSelect));
    navigate("/date");
  }

  return (
    <div className="dash-board" data-testid="dash-board">
      <div className="titles">
        <h1 className="header-dash">Select the movies you'd like to see</h1>
      </div>
      <MoviesList />
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
