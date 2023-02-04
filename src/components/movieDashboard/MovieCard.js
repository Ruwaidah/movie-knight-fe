import React, { useState, useEffect } from "react";
import "./dashboard.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toggleNext, toggleNextOff } from "../../features/users/usersSlice";
// import { withRouter } from "react-router-dom";
// import { toggleNext, toggleNextOff } from "../../actions/index";
// import { connect } from "react-redux";
// import { act } from "react-dom/test-utils";

function MovieCard(props) {
  const navigate = useNavigate();
  const { NextButton } = useSelector((state) => state.users);
  let path;
  const [active, setActive] = useState(false);
  // const [movieSelect, setMovieSelect] = useState([]);
  if (props.movie.ratings)
    path = `${props.movie.title}&rate=${props.movie.ratings[0].code}`;
  else path = props.movie.title;

  function toggleClass() {
    const currentState = active;
    setActive(!currentState);
    toggleNext();
  }

  function unSelectMovie() {
    setActive(false);
    // props.toggleNext();
  }

  useEffect(() => {
    if (active) props.setMovieSelect([...props.movieSelect, props.movie]);
    else {
      const filter = props.movieSelect.filter((movie1) => {
        return movie1.title !== props.movie.title;
      });

      props.setMovieSelect(filter);
    }
  }, [active]);

  if (props.movieSelect.length > 0 && NextButton == false) {
    toggleNext();
  } else if (props.movieSelect.length === 0 && NextButton == true) {
    toggleNextOff();
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
            onClick={
              props.movieSelect.length == 3 ? unSelectMovie : toggleClass
            }
          />
          <p
            onClick={() =>
              navigate({
                pathname: `/details/${path}`,
                state: { movieSelect: props.movieSelect },
              })
            }
            className={active ? "movie-title-enable" : "movie-title-disable"}
          >
            {active ? "View Details" : null}
          </p>
        </div>
        <p
          // onClick={() => props.history.push(`/details/${path}`)}
          className={active ? "movie-title-enable" : "movie-title-disable"}
        >
          {props.movie.title.length > 20
            ? props.movie.title.slice(0, 17) + "..."
            : props.movie.title}
        </p>
      </div>
    );
}

// const mapStateToProps = (state) => {
//   return {
//     NextButton: state.NextButton,
//   };
// };

// export default withRouter(
//   connect(mapStateToProps, { toggleNext, toggleNextOff })(MovieCard)
// );

export default MovieCard;
