import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosWithAuth from "../../utils/axiosWithAuth";
const initialState = {};

export const getMovieDetail = createAsyncThunk(
  "get_movies_detail",
  (movieName, thunkAPI) => {
    return axiosWithAuth
      .post(`/api/movies/moviedetails`, {
        title: `${movieName}`,
      })
      .then((respone) => respone.data)
      .catch((err) => thunkAPI.rejectWithValue(err.respone));
  }
);

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
  },
});

export default moviesSlice.reducer;
