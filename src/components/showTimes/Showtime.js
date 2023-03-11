import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./showtime.scss";
// import { getUserById } from "../../features/users/usersSlice";
// import { getShowTimesRsults } from "../../features/movies/moviesSlice";
import Loading from "../Loading.js";
import TheatresCard from "./TheatresCard.js";
import TimesCard from "./TimesCard.js";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../progress-nav-bars/ProgressBar";

const Showtime = () => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    results,
    // fetchingData,
    daySelects,
    timeSelects,
    seatsSelects,
    ticketsNumber,
  } = useSelector((state) => state.movies);
  const { movieSelect } = useSelector((state) => state.movies);

  useEffect(() => {
    if (Object.keys(movieSelect).length < 1) navigate("/");
  }, []);
  // let movies = MovieSelects.map((movie) => movie.tmsId);
  // useEffect(() => {
  //   dispatch(getUserById());
  //   dispatch(
  //     getShowTimesRsults({
  //       movies: movies,
  //       days: daySelects,
  //       times: timeSelects,
  //       seats: seatsSelects,
  //       tickets: ticketsNumber,
  //     })
  //   );
  // }, []);

  // if (fetchingData) return <Loading />;
  const moviesShow = Object.entries(movieSelect).map(([id, obj]) => ({
    id,
    ...obj,
  }));
  console.log(moviesShow);
  return (
    <div className="showtime-card">
      <h3 className="text">Your matches</h3>
      {moviesShow.map((movie, index) => (
        // let movie = movieSelect.filter((mo) => mo.tmsId == movie.id);
        // if (movie.length > 0)
        // <div key={movie.rootId}>
        <div key={movie.rootId}>
          <div className="movie-info">
            <img className="poster" src={movie.image} alt={movie.title} />
            <div className="movie-text">
              <h2 className="title">{movie.title}</h2>
              <h4 className="runtime">{runTime(movie.runTime)}</h4>
              <h4 className="rated">Rated {movie.ratings[0].code}</h4>
            </div>
          </div>
          {movie.showtimes.length === 0 ? (
            <h4>no matches</h4>
          ) : (
            movie.showtimes.map((show, ind) => {
              return (
                <div
                  key={ind}
                  className={
                    index === moviesShow.length - 1
                      ? ind === movie.showtimes.length - 1
                        ? "lasttheater"
                        : null
                      : null
                  }
                >
                  {/* {ind == 1 ? <p className="options">Other Options</p> : null} */}
                  <TheatresCard show={show} ind={ind} />
                  <div
                    className={
                      ind > 0
                        ? "black-bg whiteBo theatre-showtime"
                        : "theatre-showtime"
                    }
                  >
                    <h5 className="sub-text">Standard format</h5>
                    <div className="day-time">
                      <div className="day-div">
                        <h4
                          className={
                            ind > 0 ? "white-text days-text" : "days-text"
                          }
                        >
                          {show.dateTime.split("T")[0]}
                        </h4>
                      </div>
                      <div className="times-div">
                        <TimesCard
                          time={show.dateTime.split("T")[1]}
                          setActive={setActive}
                          active={active}
                        />
                      </div>
                    </div>
                  </div>
                  {index === 0 ? (
                    ind == 0 ? (
                      <p className="back-home">
                        <span>Want to see different movie?</span>
                      </p>
                    ) : null
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      ))}
      <div className="space"></div>
      <ProgressBar />
    </div>
  );
};

function runTime(str) {
  let num = str.replace(/\D+/g, "");
  let hours = num.substring(1, 2);
  let min = num.substring(2, 4);
  return `${hours}h ${min}m`;
}

export default Showtime;
