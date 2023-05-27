import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { act } from "@testing-library/react";
const initialState = {
  gettingMoviesLoading: false,
  gettingUpMoviesLoading: false,
  comingMovies: [],
  allMovies: [],
  movieSelect: {},
  movie: null,
  seats: [],
  daySelects: [],
  ticketsNumber: 0,
  seatsSelects: [],
  timeSelects: [],
  ticket: false,
  results: null,
  theatresInfo: null,
  isLoading: false,
  gettingResult: true,
  // theater: {},
  // isTheaters: true,
  gettingTheaters: true,
};
function checkDate() {
  var day = new Date();
  var dd = String(day.getDate()).padStart(2, "0");
  var mm = String(day.getMonth() + 1).padStart(2, "0");
  var yyyy = day.getFullYear();
  day = yyyy + "-" + mm + "-" + dd;
  // if (req.query && req.query.date) return (date = req.query.date);
  // else
  return day;
}

// ************************************* GET ALL THE MOVIES
export const makeCall = createAsyncThunk(
  "get_all_movies",
  async (zipcode, thunkAPI) => {
    const date = checkDate();
    return await axiosWithAuth()
      .get(`/api/movies?startDate=${date}&zip=${zipcode}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error));
  }
);

// ************************************* GET UPCOMING MOVIES
export const getUpcomingMovies = createAsyncThunk(
  "get_up_coming_movies",
  async (thunkAPI) => {
    return await axiosWithAuth()
      .get(`/api/upcoming`)
      .then((respone) => {
        return respone.data;
      })
      .catch((err) => {
        thunkAPI.rejectWithValue(err.respone);
      });
  }
);

// ************************************* GET MOVIE DETAIL
export const getMovieDetails = createAsyncThunk(
  "get_movies_detail",
  async (movieTitle, thunkAPI) => {
    return axiosWithAuth()
      .get(`/api/movies/moviedetails/${movieTitle}`)
      .then((respone) => respone.data)
      .catch((err) => thunkAPI.rejectWithValue(err.respone));
  }
);

// ************************************* SHOWTIMES RESULT
export const getShowTimesRsults = createAsyncThunk(
  "get_showtime_result",
  async (data, thunkAPI) => {
    console.log(data);
    const zipcode = localStorage.getItem("zip") || "47712";
    return await axiosWithAuth()
      .post(`/api/filtermovies?zip=${zipcode}`, data)
      .then((respone) => {
        console.log(respone);
        return respone.data;
      })
      .catch((err) => {
        console.log(err);
        thunkAPI.rejectWithValue(err);
      });
  }
);

// ************************************* THEATERS INFO =======================
export const getTheatersInfo = createAsyncThunk(
  "get_Theaters_Info",
  (data, thunkAPI) => {
    console.log("snjbisbib");
    console.log(data);
    if (data.length === 0) return { data: [] };
    return axiosWithAuth()
      .post("/api/theaters", { theatres: data })
      .then((respone) => respone.data)
      .catch((err) => thunkAPI.rejectWithValue(err.respone));
  }
);

// ********************************** GETTING ALL SEATS
export const getSeats = createAsyncThunk("getting_seats", (data, thunkAPI) => {
  return axiosWithAuth()
    .get("/api/seats")
    .then((respone) => {
      return respone.data;
    })
    .catch((errorr) => thunkAPI.rejectWithValue(errorr.respone));
});

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

//  ===================================================================================================

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    selecting_movies: (state, action) => {
      if (state.movieSelect[action.payload.index]) {
        delete state.movieSelect[action.payload.index];
      } else if (Object.keys(state.movieSelect).length < 3) {
        state.movieSelect[action.payload.index] = action.payload.movie;
      }
    },
    dayNext: (state, action) => {
      state.daySelects = action.payload.map((day) => day[2]);
    },
    ticketsNum: (state, action) => {
      state.ticketsNumber = action.payload;
    },
    // ********************************* SEAT SELECT
    seatsArea: (state, action) => {
      state.seatsSelects = action.payload;
    },

    // ********************************** TIME SELECT
    timeSelectAction: (state, action) => {
      state.timeSelects = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // **************************** GET ALL MOVIES
      .addCase(makeCall.pending, (state) => {
        state.gettingMoviesLoading = true;
      })
      .addCase(makeCall.fulfilled, (state, action) => {
        state.gettingMoviesLoading = false;
        state.allMovies = action.payload;
      })
      .addCase(makeCall.rejected, (state, action) => {})

      // **************************** GET UP COMING MOVIES
      .addCase(getUpcomingMovies.pending, (state) => {
        state.gettingUpMoviesLoading = true;
      })
      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        state.gettingUpMoviesLoading = false;
        state.comingMovies = action.payload;
      })
      .addCase(getUpcomingMovies.rejected, (state, action) => {})
      // .addCase(getSeats.pending, (state) => {})
      .addCase(getSeats.fulfilled, (state, action) => {
        state.seats = action.payload;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.movie = action.payload;
      })

      // ======================================= GET THEATERS INFO ================================
      .addCase(getTheatersInfo.fulfilled, (state, action) => {
        console.log(action.payload);
        state.theatresInfo = action.payload;
        state.gettingTheaters = false;
      })

      // ======================================= GET SHOW TIMES RESULT ================================
      // .addCase(getShowTimesRsults.pending, (state) => (state.gettingResult = true))
      .addCase(getShowTimesRsults.fulfilled, (state, action) => {
        state.gettingResult = false;
        state.results = action.payload;
      })
      .addCase(getShowTimesRsults.rejected, (state, action) =>
        // state.isLoading = false
        console.log("sfefe")
      );
  },
});

export const {
  selecting_movies,
  dayNext,
  timeSelectAction,
  ticketsNum,
  seatsArea,
} = moviesSlice.actions;

export default moviesSlice.reducer;
