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
  const { movieSelect } = useSelector((state) => state.movies);
  let path;
  const [active, setActive] = useState(false);
  if (props.movie.ratings)
    path = `${props.movie.title}&rate=${props.movie.ratings[0].code}`;
  else path = props.movie.title;

  function toggleClass() {
    const currentState = active;
    setActive(!currentState);
    // setActive(!active);
    dispatch(toggleNext());
  }

  console.log(movieSelect, props.movie);
  console.log(active);

  function unSelectMovie() {
    setActive(false);
  }

  useEffect(() => {
    if (active) dispatch(selecting_movies([...movieSelect, props.movie]));
    else {
      const filter = movieSelect.filter((movie1) => {
        return movie1.title !== props.movie.title;
      });

      dispatch(unSelecting_movie(filter));
    }
  }, [active]);

  if (movieSelect.length > 0 && NextButton == false) {
    dispatch(toggleNext());
  } else if (movieSelect.length === 0 && NextButton == true) {
    dispatch(toggleNextOff());
  }

  if (props.movie)
    return (
      <div className="movie-card">
        <div
          className={active ? "movie-img-enable red-box" : "movie-img-disable "}
        >
          <img
            src={props.movie.image}
            alt={props.movie.title}
            onClick={movieSelect.length == 3 ? unSelectMovie : toggleClass}
          />
          <p
            onClick={() => navigate(`/details/${path}`)}
            className={active ? "movie-title-enable" : "movie-title-disable"}
          >
            {active ? "View Details" : null}
          </p>
        </div>
        <p className={active ? "movie-title-enable" : "movie-title-disable"}>
          {props.movie.title.length > 20
            ? props.movie.title.slice(0, 17) + "..."
            : props.movie.title}
        </p>
      </div>
    );
}

export default MovieCard;
