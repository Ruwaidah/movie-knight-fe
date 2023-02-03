import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosWithAuth from "../../utils/axiosWithAuth";
const initialState = {};

// ************************************* GET MOVIE DETAIL
export const getMovieDetail = createAsyncThunk(
  "get_movies_detail",
  (movieName, thunkAPI) => {
    return axiosWithAuth()
      .post(`/api/movies/moviedetails`, {
        title: `${movieName}`,
      })
      .then((respone) => respone.data)
      .catch((err) => thunkAPI.rejectWithValue(err.respone));
  }
);

// ************************************* GET UPCOMING MOVIES
export const getUpcomingMovies = createAsyncThunk(
  "get_up_coming_movies",
  (thunkAPI) => {
    return axiosWithAuth()
      .get(`/api/upcoming`)
      .then((respone) => respone.data)
      .catch((err) => thunkAPI.rejectWithValue(err.respone));
  }
);

// ************************************* SHOWTIMES RESULT
export const getShowTimesRsults = createAsyncThunk(
  "get_showtime_result",
  (data, thunkAPI) => {
    let theatres = [];
    const zipcode = localStorage.getItem("zip") || "47712";
    return axiosWithAuth()
      .post(`/api/filtermovies?zip=${zipcode}`, data)
      .then((respone) => {
        respone.data.map((movies) =>
          movies.showtimes.map((theater) => theatres.push(theater.id))
        );
        theatres = theatres.filter((thea) => thea.length > 0);
        if (theatres.length == 0) return [respone.data, theatres];
        else {
          axiosWithAuth()
            .post("/api/theaters", { theatres: theatres })
            .then((data1) => {
              return [respone.data, data1.data];
            })
            .catch((err) => thunkAPI.rejectWithValue(err.respone));
        }
      })
      .catch((err) => thunkAPI.rejectWithValue(err.respone));
  }
);

// ********************************** ADD FAVORITE THEATRES
export const addfavoriteTheatres = createAsyncThunk(
  "add_favorite_theaters",
  (data, thunkAPI) => {
    let path;
    if (localStorage.getItem("googleId"))
      path = `googleId=${localStorage.getItem("googleId")} `;
    else if (localStorage.getItem("userId"))
      path = `userId=${localStorage.getItem("userId")} `;
    axiosWithAuth()
      .post(`/api/theatres/favorite?${path}`, data)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  }
);

// ********************************* DELETE FAVORITE THEATRE
export const delfavoriteTheatres =
  ("delete_favorite_theaters",
  (id, thunkAPI) => {
    let path;
    if (localStorage.getItem("googleId"))
      path = localStorage.getItem("googleId");
    else if (localStorage.getItem("userId"))
      path = localStorage.getItem("userId");
    axiosWithAuth()
      .delete(`/api/theatres/favorite?userid=${path}&theaterid=${id}`)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  });

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: {
    // ************************************* GET MOVIE DETAIL
    [getMovieDetail.pending]: (state, action) => {
      state.fetchingData = true;
    },
    [getMovieDetail.fulfilled]: (state, action) => {
      state.fetchingData = false;
      state.movieDetails = action.payload;
    },
    [getMovieDetail.rejected]: (state, action) => {
      state.fetchingData = false;
      state.error = action.payload;
    },
    [getShowTimesRsults.pending]: (state) => {
      state.fetchingData = true;
      state.error = "";
    },
    [getShowTimesRsults.fulfilled]: (state, action) => {
      state.fetchingData = false;
      state.error = "";
      state.results = action.payload[0];
      state.theatres = action.payload[1];
    },
    [getShowTimesRsults.rejected]: (state, action) => {
      state.fetchingData = false;
      state.error = action.payloa;
    },
  },
});

export default moviesSlice.reducer;
