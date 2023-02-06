import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosWithAuth from "../../utils/axiosWithAuth";
const initialState = {
  fetchingData: false,
  movies: [],
};

// ************************************* GET ALL THE MOVIES
export const makeCall = createAsyncThunk(
  "get_all_movies",
  (zipcode, thunkAPI) => {
    console.log("makecall", zipcode)
    axiosWithAuth()
      .get(`https://movieknight01.herokuapp.com/api/movies?zip=${zipcode}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
);

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
  extraReducers: (builder) => {
    builder
      // **************************** GET ALL MOVIES
      .addCase(makeCall.pending, (state) => {
        state.fetchingData = true;
      })
      .addCase(makeCall.fulfilled, (state, action) => {
        state.fetchingData = false;
        console.log(action);
      })
      .addCase(makeCall.rejected, (state, action) => {
        console.log(action);
      })
      // ************************************* GET MOVIE DETAIL
      .addCase(getMovieDetail.pending, (state, action) => {
        state.fetchingData = true;
      })
      .addCase(getMovieDetail.fulfilled, (state, action) => {
        state.fetchingData = false;
        state.movieDetails = action.payload;
      })
      .addCase(getMovieDetail.rejected, (state, action) => {
        state.fetchingData = false;
        state.error = action.payload;
      })
      .addCase(getShowTimesRsults.pending, (state) => {
        state.fetchingData = true;
        state.error = "";
      })
      .addCase(getShowTimesRsults.fulfilled, (state, action) => {
        state.fetchingData = false;
        state.error = "";
        state.results = action.payload[0];
        state.theatres = action.payload[1];
      })
      .addCase(getShowTimesRsults.rejected, (state, action) => {
        state.fetchingData = false;
        state.error = action.payloa;
      });
  },
});

export default moviesSlice.reducer;
