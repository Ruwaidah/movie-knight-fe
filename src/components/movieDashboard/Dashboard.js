import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import MovieList from "./MovieList";
import "./dashboard.scss";
import UpComingMovies from "./UpComingMovies.js";
import { connect } from "react-redux";
import { movieNext } from "../../actions/index.js";

export const Dashboard = props => {
  const [movieSelect, setMovieSelect] = useState([]);
  function DatePage() {
    props.movieNext(movieSelect);
    props.history.push("/date");
  }

  return (
    <div className="dash-board" data-testid="dash-board">
      <div className="titles">
        <h1 className="header-dash">Select the movies you'd like to see</h1>
      </div>
      <MovieList movieSelect={movieSelect} setMovieSelect={setMovieSelect} />
      <UpComingMovies />

      {props.NextButton ? (
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

export default withRouter(connect(mapStateToProps, { movieNext })(Dashboard));
