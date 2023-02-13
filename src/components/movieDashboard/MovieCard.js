import React, { useState, useEffect } from "react";
import "./dashboard.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selecting_movies,
  unSelecting_movie,
} from "../../features/movies/moviesSlice";
import { toggleNext, toggleNextOff } from "../../features/users/usersSlice";

function MovieCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { NextButton } = useSelector((state) => state.users);
  const { movieSelect, allMovies } = useSelector((state) => state.movies);
  let path;
  // const [active, setActive] = useState(false);
  if (props.movie.ratings)
    path = `${props.movie.title}&rate=${props.movie.ratings[0].code}`;
  else path = props.movie.title;

  // function toggleClass() {
  //   const currentState = active;
  //   setActive(!currentState);
  //   dispatch(toggleNext());
  // }

  const checkError = (e) => {
    e.target.src = process.env.REACT_APP_NO_IMAGE;
  };

  // const toggleMovie = () => {};

  // function unSelectMovie() {
  //   setActive(false);
  // }

  const toggleSelecting = () => {
    // if (Object.keys(movieSelect).length < 3 ) {
    dispatch(selecting_movies({ index: props.i, movie: props.movie }));
    // }
  };

  useEffect(() => {
    console.log(movieSelect);
  }, [movieSelect]);

  if (Object.keys(movieSelect).length > 0 && NextButton == false) {
    dispatch(toggleNext());
  } else if (Object.keys(movieSelect).length === 0 && NextButton == true) {
    dispatch(toggleNextOff());
  }

  if (props.movie)
    return (
      <div className="movie-card">
        <div
          className={
            movieSelect[props.i]
              ? "movie-img-enable red-box"
              : "movie-img-disable "
          }
        >
          <img
            src={`http://developer.tmsimg.com/${props.movie.preferredImage.uri}/&api_key=${process.env.REACT_APP_API_KEY}`}
            onError={checkError}
            onClick={toggleSelecting}
          />

          <p
            onClick={() => navigate(`/details/${path}`)}
            className={
              movieSelect[props.i]
                ? "movie-title-enable"
                : "movie-title-disable"
            }
          >
            {movieSelect[props.i] ? "View Details" : null}
          </p>
        </div>
        <p
          className={
            movieSelect[props.i] ? "movie-title-enable" : "movie-title-disable"
          }
        >
          {props.movie.title.length > 20
            ? props.movie.title.slice(0, 17) + "..."
            : props.movie.title}
        </p>
      </div>
    );
}

export default MovieCard;
