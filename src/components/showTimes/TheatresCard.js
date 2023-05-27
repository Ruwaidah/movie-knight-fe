import React, { useState } from "react";
import TimesCard from "./TimesCard";
import "./showtime.scss";
import { getTheatersAddress } from "../../features/movies/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../features/users/usersSlice";
import whiteheart from "../images/whiteheart.png";
import redheart from "../images/redheart.png";
import { useEffect } from "react";
import { displayImage } from "../TheatersImages";

const TheatresCard = (props) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const { theater, isTheaters } = useSelector((state) => state.movies);
  const [theateraddress, settheatersaddress] = useState();
  let uniqueDate = {}

  useEffect(() => {
    console.log("getttting");
    dispatch(getTheatersAddress(props.show[0]));
  }, []);

  const addToFavorite = () => {
    setIsFavorite(true);
  };

  const delFromFavorite = () => {
    setIsFavorite(false);
  };
  if (isTheaters || !theater[props.show[0]])
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  return (
    <div
      // key={index}
      className={
        // index === moviesShow.length - 1
        props.ind === props.movie.showtimes.length - 1
          ? "lasttheater"
          : // : null
            null
      }
    >
      <div className={props.ind > 0 ? "black-bg theatre" : "theatre"}>
        <div className="all-theater-info">
          <img
            src={displayImage(theater[props.show[0]].name)}
            className="theater-logo"
            alt={theater[props.show[0]].name}
          />

          <div className="theateraddress">
            <h2 className="theatre-name">{theater[props.show[0]].name}</h2>

            <p>{`${theater[props.show[0]].location.address.street}, ${
              theater[props.show[0]].location.address.city
            }, ${theater[props.show[0]].location.address.state}, ${
              theater[props.show[0]].location.address.postalCode
            }`}</p>
          </div>
        </div>

        {/* {localStorage.getItem("googleId") || localStorage.getItem("userId") ? (
        <div className="hearticon">
          {isFavorite ? (
            <img src={redheart} onClick={() => delFromFavorite()} />
          ) : (
            <img src={whiteheart} onClick={() => addToFavorite()} />
          )}
        </div>
      ) : null} */}
        {props.show[1].map((theater, index) => {
          // console.log(theater)
          uniqueDate[theater.dateTime.split("T")[0]] = theater.dateTime.split("T")[1]
           return (
            <>
              {/* {ind == 1 ? <p className="options">Other Options</p> : null} */}
              {/* <TheatresCard show={show} ind={ind} /> */}
              <div
                className={
                  index > 0
                    ? "black-bg whiteBo theatre-showtime"
                    : "theatre-showtime"
                }
              >
                <h5 className="sub-text">Standard format</h5>
                <div className="day-time">
                  <div className="day-div">
                    <h4
                      className={
                        props.ind > 0 ? "white-text days-text" : "days-text"
                      }
                    >
                      {theater.dateTime.split("T")[0]}
                    </h4>
                  </div>
                  <div className="times-div">
                    <TimesCard
                      time={theater.dateTime.split("T")[1]}
                      // setActive={setActive}
                      // active={active}
                    />
                  </div>
                </div>
              </div>
              {index === 0 ? (
                props.ind == 0 ? (
                  <p className="back-home">
                    <span>Want to see different movie?</span>
                  </p>
                ) : null
              ) : null}
              {/* </div> */}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default TheatresCard;
