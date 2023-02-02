import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/usersSlice.js";
import moviesReducer from "./features/movies/moviesSlice.js";

export const store = configureStore({
  reducer: {
    users: userReducer,
    movies: moviesReducer
  },
});
