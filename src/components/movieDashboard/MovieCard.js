import React, { useState, useEffect } from "react";
import "./dashboard.scss";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selecting_movies,
  // unSelecting_movie,
} from "../../features/movies/moviesSlice";
import { toggleNext, toggleNextOff } from "../../features/users/usersSlice";

function MovieCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { NextButton } = useSelector((state) => state.users);

  const { movieSelect } = useSelector((state) => state.movies);
  // let path;

  // if (props.movie.ratings)
  //   path = `${props.movie.title}&rate=${props.movie.ratings[0].code}`;
  // else path = props.movie.title;

  const path = props.movie.tmsId;

  const checkError = (e) => {
    e.target.src = process.env.REACT_APP_NO_IMAGE;
  };

  const toggleSelecting = () => {
    dispatch(selecting_movies({ index: props.i, movie: props.movie }));
  };

  const isLoading = (e) => {
    setTimeout(() => {
      return;
    }, 100);
  };

  useEffect(() => {
    if (Object.keys(movieSelect).length > 0 && NextButton == false) {
      dispatch(toggleNext());
    } else if (Object.keys(movieSelect).length === 0 && NextButton == true) {
      dispatch(toggleNextOff());
    }
  }, [movieSelect]);

  const image_url = setTimeout(() => {
    return `http://developer.tmsimg.com/${props.movie.preferredImage.uri}/&api_key=${process.env.REACT_APP_API_KEY}`;
  }, 100);

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
            src={`http://developer.tmsimg.com/${props.movie.preferredImage.uri}&&api_key=${process.env.REACT_APP_API_KEY}`}
            onError={checkError}
            onLoad={isLoading}
            onClick={toggleSelecting}
          />

          {/* <p
            onClick={() => navigate(`/details/${path}`)}
            className={
              movieSelect[props.i]
                ? "movie-title-enable"
                : "movie-title-disable"
            }
          >
            {movieSelect[props.i] ? "View Details" : null}
          </p> */}
          <Link
            to={`/details/${path}`}
            className={
              movieSelect[props.i]
                ? "movie-title-enable"
                : "movie-title-disable"
            }
          >
            {" "}
            {movieSelect[props.i] ? "View Details" : null}{" "}
          </Link>
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
