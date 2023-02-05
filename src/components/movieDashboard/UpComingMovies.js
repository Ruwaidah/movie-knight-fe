import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUpcomingMovies } from "../../features/movies/moviesSlice.js";
import Loading from "../Loading.js";

function UpComingMovies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { upcomingMovies, movieList } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getUpcomingMovies());
  }, []);

  if (!movieList) return <Loading />;

  return (
    <div className="upcoming-com">
      <h4>Coming Soon ..</h4>
      <div className="movie-list">
        {upcomingMovies.map((movies) =>
          movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <div className="movie-img-disable ">
                {movie.poster_path === null ? (
                  <img
                    alt="noimage"
                    className="no-movie-poster"
                    src={`https://res.cloudinary.com/donsjzduw/image/upload/v1580504817/hfjrl5wbkiugy4y0gmqu.jpg`}
                  />
                ) : (
                  <img
                    src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                    alt={movie.title}
                  />
                )}
              </div>
              <p
                onClick={() => navigate(`/details/${movie.title}`)}
                className="movie-title-disable"
              >
                {movie.title.length > 20
                  ? movie.title.slice(0, 17) + "..."
                  : movie.title}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UpComingMovies;
