import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import "react-circular-progressbar/dist/styles.css";
import { getMovieDetails } from "../../features/movies/moviesSlice.js";
import "./movieDetails.scss";
import Loading from "../Loading.js";
import ProgressBar from "../progress-nav-bars/ProgressBar.js";
import { movieNext } from "../../features/users/usersSlice";

const MovieDetails = (props) => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rating = location.pathname.split("=");
  const { movie } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getMovieDetails(params.movieTitle));
  }, []);
  function DatePage() {
    dispatch(movieNext(props.location.state.movieSelect));
    navigate("/date");
  }
  function runtime(num) {
    let hours = Math.floor(num / 60);
    let minutes = num % 60;
    return `${hours}hr ${minutes}m`;
  }
  let firsttitle;
  let second_title;
  function reverseString(str) {
    return str.split("-").reverse().join("-");
  }
  if (movie) {
    firsttitle = movie.movie.original_title.split("(")[0];
    second_title = movie.movie.original_title.split("(")[1];
  }
  if (!movie) return <Loading />;
  else {
    const rate = movie.movie.vote_average.toString().replace(".", "");

    let casts = movie.casts[0].slice(0, 4);
    return (
      <div className="movieDetails-com">
        <>
          {!movie.videos[0] ? (
            <iframe
              src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
            />
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${movie.videos[0].key}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
            />
          )}
        </>
        <div className="image-headers">
          <img
            src={`http://image.tmdb.org/t/p/w185/${movie.movie.poster_path}`}
          />
          <div className="headers">
            <h5 className="title">
              {movie.movie.original_title.includes("(")
                ? movie.movie.original_title.split("(")[0]
                : movie.movie.original_title.includes(":")
                ? movie.movie.original_title.split(":")[0]
                : movie.movie.original_title}
            </h5>
            <>
              {!movie.directors[0] ? (
                <p>
                  <span>Directed by N/A</span>
                </p>
              ) : (
                <p>
                  <span>Directed by {movie.directors[0].name}</span>
                </p>
              )}
            </>
            <p>
              <span> {runtime(movie.moviedetail.runtime)}</span>
            </p>
            {rating[1] ? (
              <p>
                <span>Rated {rating[1]}</span>
              </p>
            ) : null}
            <StarRatings
              rating={movie.movie.vote_average / 2}
              starRatedColor="red"
              // changeRating={this.changeRating}
              numberOfStars={5}
              starDimension="20px"
              starSpacing="1px"
              name="rating"
            />
            <button className="get-tickets-button" onClick={DatePage}>
              Get Tickets
            </button>
          </div>
        </div>

        <div className="overview">
          <h5>
            {movie.movie.original_title.includes("(")
              ? movie.movie.original_title
              : movie.movie.original_title.includes(":")
              ? movie.movie.original_title
              : null}
          </h5>
          <p>{movie.movie.overview}</p>
        </div>
        <div className="casts">
          <div className="cast-title">
            <h3>Top Casts</h3>
            {/* <p onClick={() => setSeeAllCasts(!seeAllCasts)}>
              {seeAllCasts ? "See top Casts" : "See all casts "}{" "}
            </p> */}
          </div>
          <div className="casts-dir-div">
            {casts.map((people) => (
              <div key={people.cast_id}>
                {people.profile_path === null ? (
                  <img
                    alt="no-image"
                    className="cast-img"
                    // src={`https://res.cloudinary.com/donsjzduw/image/upload/v1580504817/hfjrl5wbkiugy4y0gmqu.jpg`}
                  />
                ) : (
                  <img
                    alt={people.name}
                    className="cast-img"
                    src={`http://image.tmdb.org/t/p/w185/${people.profile_path}`}
                  />
                )}
                <p>{people.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="director">
          <h3>Directors </h3>
          <div className="casts-dir-div">
            {movie.directors.map((people) => (
              <div key={people.id}>
                <>
                  {people.profile_path === null ? (
                    <img
                      alt="no-image"
                      className="dir-img"
                      // src={`https://res.cloudinary.com/donsjzduw/image/upload/v1580504817/hfjrl5wbkiugy4y0gmqu.jpg`}
                    />
                  ) : (
                    <img
                      alt={people.name}
                      className="dir-img"
                      src={`http://image.tmdb.org/t/p/w185/${people.profile_path}`}
                    />
                  )}
                </>
                <p>{people.name}</p>
              </div>
            ))}
          </div>
          <div className="space"></div>
        </div>
        <ProgressBar />
      </div>
    );
  }
};

export default MovieDetails;
