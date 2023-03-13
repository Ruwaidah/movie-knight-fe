import React, { useState } from "react";
import "./showtime.scss";
import { getTheatersAddress } from "../../features/movies/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
// import { addfavoriteTheatres, delfavoriteTheatres, getUserById } from '../../actions/index.js'
import {
  addfavoriteTheatres,
  delfavoriteTheatres,
} from "../../features/movies/moviesSlice";
import { getUserById } from "../../features/users/usersSlice";
import whiteheart from "../images/whiteheart.png";
import redheart from "../images/redheart.png";
import { useEffect } from "react";
import { displayImage } from "../TheatersImages";
import axios from "axios";

const TheatresCard = (props) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const { theater, isTheaters } = useSelector((state) => state.movies);
  const [theateraddress, settheatersaddress] = useState();
  // console.log(props.getTheater.location)
  // const theatre = props.theatres.filter(thea => thea.theatreId == props.show.id)
  // const theatre = theatres.filter((thea) => thea.theatreId == props.show.id);
  // let theatersaddress = {};
  useEffect(() => {
    // let theater;
    // if (userInfo && firstTime) {
    //   theater = userInfo.theatres.filter(
    //     (theat) => theat.theatreId == props.show.id
    //   );
    //   setUserTheatre(theater);
    //   setFirstTime(false);
    //   if (theater.length > 0) setIsFavorite(true);
    // }
    // if (theater[props.show.theatre.id] = "undefined") {
    console.log("getttting");
    dispatch(getTheatersAddress(props.show.theatre.id));
    // axios
    //   .get(
    //     `${process.env.REACT_APP_THEATER}${props.show.theatre.id}?api_key=${process.env.REACT_APP_API_KEY}`
    //   )
    //   .then((response) => {
    //     // console.log(response.data);
    //     settheatersaddress({
    //       ...theateraddress,
    //       [props.show.theatre.id]: response,
    //     });
    //   })
    //   .catch((error) => console.log(error));
    // }
    // else {
    //   console.log(theater[props.show.theatre.id])
    // }
  }, []);

  console.log(theater);
  const addToFavorite = () => {
    // props.addfavoriteTheatres(theatre)
    // dispatch(addfavoriteTheatres(theatre));
    // props.getUserById()
    setIsFavorite(true);
  };

  const delFromFavorite = () => {
    // dispatch(delfavoriteTheatres(props.show.id));
    setIsFavorite(false);
  };
  // console.log(props.show);
  if (isTheaters || !theater[props.show.theatre.id])
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  return (
    <div className={props.ind > 0 ? "black-bg theatre" : "theatre"}>
      <div className="all-theater-info">
        <img
          src={displayImage(props.show.theatre.name)}
          className="theater-logo"
          alt={props.show.theatre.name}
        />

        <div className="theateraddress">
          <h2 className="theatre-name">{props.show.theatre.name}</h2>

          <p>{`${theater[props.show.theatre.id].location.address.street}, ${
            theater[props.show.theatre.id].location.address.city
          }, ${theater[props.show.theatre.id].location.address.state}, ${
            theater[props.show.theatre.id].location.address.postalCode
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
    </div>
  );
};

export default TheatresCard;
