import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUpcomingMovies } from "../../features/movies/moviesSlice.js";
import Loading from "../Loading.js";

function UpComingMovies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { comingMovies, gettingUpMoviesLoading } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(getUpcomingMovies());
    // axios
    //   .get(`http://localhost:5000/api/upcoming`)
    //   .then((respone) => {
    //     console.log(respone);
    //    return respone.data;
    //   })
    //   .catch((err) =>{
    //     console.log(err)
    //   })
  }, []);

  const checkError = (e) => {
    e.target.src = process.env.REACT_APP_NO_IMAGE;
  };

  if (gettingUpMoviesLoading) return <Loading />;

  return (
    <div className="upcoming-com">
      <h4>Coming Soon ..</h4>
      <div className="movie-list">
        {comingMovies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <div className="movie-img-disable ">
              {/* {movie.poster_path === null ? (
                  <img
                    alt="noimage"
                    className="no-movie-poster"
                    src={`https://res.cloudinary.com/donsjzduw/image/upload/v1580504817/hfjrl5wbkiugy4y0gmqu.jpg`}
                  /> */}
              <img
                src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                alt={movie.title}
                onError={checkError}
              />
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
        ))}
      </div>
    </div>
  );
}

export default UpComingMovies;
