import React, { useState } from "react";
// import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MovieList from "./MovieList";
import "./dashboard.scss";
import UpComingMovies from "./UpComingMovies.js";
import { useNavigate } from "react-router-dom";
// import { connect } from "react-redux";
// import { movieNext } from "../../actions/index.js";
import { movieNext } from "../../features/users/usersSlice";

export const Dashboard = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  {NextButton,MovieSelects } = useSelector(state => state.users)
  const [movieSelect, setMovieSelect] = useState([]);
  function DatePage() {
    // props.movieNext(movieSelect);
    dispatch(movieNext(movieSelect))
    // props.history.push("/date");
    navigate("/date")
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

const mapStateToProps = state => {
  return {
    NextButton: state.NextButton,
    MovieSelects: state.MovieSelects
  };
};

// export default withRouter(connect(mapStateToProps, { movieNext })(Dashboard));
export default Dashboard