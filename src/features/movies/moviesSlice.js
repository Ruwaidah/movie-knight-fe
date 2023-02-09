import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosWithAuth from "../../utils/axiosWithAuth";
const initialState = {
  gettingMoviesLoading: false,
  gettingUpMoviesLoading: false,
  comingMovies: [],
  allMovies: [],
  seats: [],
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
      // .get(`https://movieknight01.herokuapp.com/api/movies?zip=${zipcode}`)
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
  async (data, thunkAPI) => {
    console.log("geetttting");
    return await axiosWithAuth()
      .get(`/api/upcoming`)
      .then((respone) => {
        console.log(respone);
        return respone.data;
      })
      .catch((err) => {
        console.log(err);
        thunkAPI.rejectWithValue(err.respone);
      });
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

// ********************************** GETTING ALL SEATS
export const getSeats = createAsyncThunk("getting_seats", (thunkAPI) => {
  return axiosWithAuth()
    .get("/api/seats")
    .then((respone) => {
      console.log(respone.data);
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
  reducers: {},
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
      .addCase(makeCall.rejected, (state, action) => {
        console.log(action);
      })

      // **************************** GET UP COMING MOVIES
      .addCase(getUpcomingMovies.pending, (state) => {
        state.gettingUpMoviesLoading = true;
      })
      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        state.gettingUpMoviesLoading = false;
        state.comingMovies = action.payload;
      })
      .addCase(getUpcomingMovies.rejected, (state, action) => {
        console.log(action);
      })
      // .addCase(getSeats.pending, (state) => {})
      .addCase(getSeats.fulfilled, (state, action) => {
        console.log(action.payload)
        state.seats = action.payload;
      });

    // ************************************* GET MOVIE DETAIL
    // .addCase(getMovieDetail.pending, (state, action) => {
    //   state.gettingMoviesLoading = true;
    // })
    // .addCase(getMovieDetail.fulfilled, (state, action) => {
    //   state.gettingMoviesLoading = false;
    //   state.movieDetails = action.payload;
    // })
    // .addCase(getMovieDetail.rejected, (state, action) => {
    //   state.gettingMoviesLoading = false;
    //   state.error = action.payload;
    // })
    // .addCase(getShowTimesRsults.pending, (state) => {
    //   state.gettingMoviesLoading = true;
    //   state.error = "";
    // })
    // .addCase(getShowTimesRsults.fulfilled, (state, action) => {
    //   state.gettingMoviesLoading = false;
    //   state.error = "";
    //   state.results = action.payload[0];
    //   state.theatres = action.payload[1];
    // })
    // .addCase(getShowTimesRsults.rejected, (state, action) => {
    //   state.gettingMoviesLoading = false;
    //   state.error = action.payloa;
    // });
  },
});

export default moviesSlice.reducer;
