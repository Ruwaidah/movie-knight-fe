import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  results: [],
  movieList: [],
  userData: {},
  fetchingData: false,
  error: null,
  googleData: {},
  NextButton: false,
  movieDetails: {},
  upcomingMovies: [],
  MovieSelects: [],
  daySelects: [],
  ticketsNumber: 0,
  seatsSelects: [],
  timeSelects: [],
  ticket: false,
  theatres: [],
  userInfo: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default userSlice.reducer;
