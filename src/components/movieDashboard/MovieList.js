import { useState, useEffect } from "react";
import { makeCall } from "../../features/movies/moviesSlice";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "./MovieCard";
import "./dashboard.scss";
import ZipSearch from "./ZipSearch.js";
import SearchForm from "./SearchForm.js";
import FilterMenu from "./FilterMenu.js";
import Loading from "../Loading.js";

export function MovieList(props) {
  const dispatch = useDispatch()
  const { allMovies, gettingMoviesLoading } = useSelector((state) => state.movies);
  // const { fetchingData } = useSelector((state) => state.users);
  const [movies, setMovies] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [zipCode, setZipCode] = useState(47712);
  const [filters, setFilter] = useState({
    filter: "",
    rating: ["1", "2", "3", "4", "5"],
    mature: ["G", "PG", "PG-13", "R"],
  });

  // function makeCall() {
  //   console.log("make call", zipCode)
  //   axios
  //     .get(`https://movieknight01.herokuapp.com/api/movies?zip=${zipCode}`)
  //     .then((response) => {
  //       setMovies(response.data);
  //     });
  // }


  useEffect(() => {
   dispatch( makeCall(zipCode));
  }, [zipCode]);

  const toggleMenu = () => {
    document.getElementById("filter").classList.remove("toggle-menu2");
  };
  return (
    <div className="movielist-component">
      <ZipSearch setZipCode={setZipCode} />
      <p className="or-text">or</p>
      <SearchForm searchParam={searchParam} setSearchParam={setSearchParam} />
      <div className="filter-max">
        <FilterMenu setFilter={setFilter} filters={filters} />
        {props.movieSelect.length == 3 ? (
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
          onClick={toggleMenu}
        >
          {allMovies
            .filter((movie) => {
              return (
                (movie.title.includes(searchParam) ||
                  movie.title.toLowerCase().includes(searchParam)) &&
                movie.ratings &&
                movie.maturityRating &&
                filters.mature.includes(movie.ratings[0].code) &&
                movie.maturityRating[0] &&
                filters.rating.includes(
                  Math.round(
                    parseInt(movie.maturityRating[0].Value.split("/")[0]) / 2
                  ).toString()
                )
              );
            })
            .sort(function (a, b) {
              if (filters.filter === "recent") {
                var dateA = new Date(a.releaseDate),
                  dateB = new Date(b.releaseDate);
                return dateB - dateA;
              } else if (filters.filter === "old") {
                var dateA = new Date(a.releaseDate),
                  dateB = new Date(b.releaseDate);
                return dateA - dateB;
              } else if (filters.filter === "az") {
                var nameA = a.title.toLowerCase(),
                  nameB = b.title.toLowerCase();
                if (nameA < nameB)
                  //sort string ascending
                  return -1;
                if (nameA > nameB) return 1;
                return 0;
              } else if (filters.filter === "za") {
                var nameA = a.title.toLowerCase(),
                  nameB = b.title.toLowerCase();
                if (nameA > nameB)
                  //sort string ascending
                  return -1;
                if (nameA < nameB) return 1;
                return 0;
              } else {
                return null;
              }
            })
            .map((movie) => {
              return (
                <MovieCard
                  movie={movie}
                  key={movie.tmsId}
                  movieSelect={props.movieSelect}
                  setMovieSelect={props.setMovieSelect}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}




export default MovieList;
