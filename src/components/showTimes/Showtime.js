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

const Showtime = (props) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieSelect } = useSelector((state) => state.movies);
  console.log(movieSelect);
  useEffect(() => {
    if (Object.keys(movieSelect).length < 1) navigate("/");
  }, []);

  const moviesShow = Object.entries(movieSelect).map(([id, obj]) => ({
    id,
    ...obj,
  }));

  console.log(moviesShow);
  return (
    <div className="showtime-card">
      <h3 className="text">Your matches</h3>
      {props.results.map((movieslist, index) => {
        let movie = props.MovieSelects.filter(
          (mo) => mo.tmsId == movieslist.id
        );
        if (movie.length > 0)
          return (
            <div key={movieslist.id}>
              <div className="movie-info">
                <img
                  className="poster"
                  src={movie[0].image}
                  alt={movie[0].title}
                />
                <div className="movie-text">
                  <h2 className="title">{movie[0].title}</h2>
                  <h4 className="runtime">{runTime(movie[0].runTime)}</h4>
                  <h4 className="rated">Rated {movie[0].ratings[0].code}</h4>
                </div>
              </div>
              {movieslist.showtimes.length === 0 ? <h4>no matches</h4> : null}
              {movieslist.showtimes.map((show, ind) => {
                return (
                  <div
                    key={show.id + movieslist.id}
                    className={
                      index === props.results.length - 1
                        ? ind === movieslist.showtimes.length - 1
                          ? "lasttheater"
                          : null
                        : null
                    }
                  >
                    {ind == 1 ? <p className="options">Other Options</p> : null}
                    <TheatresCard show={show} ind={ind} key={ind + 1000} />
                    <div
                      className={
                        ind > 0
                          ? "black-bg whiteBo theatre-showtime"
                          : "theatre-showtime"
                      }
                    >
                      <h5 className="sub-text">Standard format</h5>
                      {show.showtime.length == 0 ? (
                        <p>no matches</p>
                      ) : (
                        <>
                          <>
                            {" "}
                            {show.showtime.map((times, i) => {
                              if (times.times.length == 0) return;
                              return (
                                <div
                                  className="day-time"
                                  key={times.date[0] + show.id + movieslist.id}
                                >
                                  <div className="day-div">
                                    <h4
                                      className={
                                        ind > 0
                                          ? "white-text days-text"
                                          : "days-text"
                                      }
                                    >{`${times.date[1]} ${
                                      Number(
                                        times.date[0].split("-")[1].slice(0, 1)
                                      ) === 0
                                        ? times.date[0]
                                            .split("-")[1]
                                            .slice(1, 2)
                                        : times.date.split("-")[1].slice(0, 2)
                                    }/${times.date[0].split("-")[2]}`}</h4>
                                  </div>
                                  <div className="times-div">
                                    {times.times.map((time) => (
                                      <TimesCard
                                        key={
                                          i +
                                          ind +
                                          show.id +
                                          movieslist.id +
                                          time
                                        }
                                        time={time}
                                        setActive={setActive}
                                        active={active}
                                      />
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        </>
                      )}
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
              })}
            </div>
          );
      })}
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
