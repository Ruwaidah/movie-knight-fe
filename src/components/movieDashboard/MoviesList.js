import { useState, useEffect } from "react";
import { makeCall } from "../../features/movies/moviesSlice";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "./MovieCard";
import "./dashboard.scss";
import ZipSearch from "./ZipSearch.js";
import SearchForm from "./SearchForm.js";
import FilterMenu from "./FilterMenu.js";
import Loading from "../Loading.js";

export function MoviesList(props) {
  const dispatch = useDispatch();
  const { allMovies, gettingMoviesLoading, movieSelect } = useSelector(
    (state) => state.movies
  );
  const [searchParam, setSearchParam] = useState("");
  const [zipCode, setZipCode] = useState(47712);
  const [filters, setFilter] = useState({
    filter: "",
    rating: ["1", "2", "3", "4", "5"],
    mature: ["G", "PG", "PG-13", "R"],
  });

  useEffect(() => {
    dispatch(makeCall(zipCode));
  }, [zipCode]);

  console.log("get call");

  //   const toggleMenu = () => {
  //     document.getElementById("filter").classList.remove("toggle-menu2");
  //   };
  if (!allMovies) return <p>Loading....</p>;
  return (
    <div className="movielist-component">
      <ZipSearch setZipCode={setZipCode} />
      <p className="or-text">or</p>
      <SearchForm searchParam={searchParam} setSearchParam={setSearchParam} />
      <div className="filter-max">
        {/* <FilterMenu setFilter={setFilter} filters={filters} /> */}
        {movieSelect.length == 3 ? (
          <p className="max-num">Max Number</p>
        ) : (
          <p className="max-num"></p>
        )}
      </div>
      {gettingMoviesLoading ? (
        <Loading />
      ) : (
        <div
          className="movie-list"
          data-testid="movielist"
          //   onClick={toggleMenu}
        >
          {allMovies.map((movie, i) => (
            <MovieCard movie={movie} key={movie.tmsId} i={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MoviesList;
