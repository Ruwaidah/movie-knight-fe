import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosWithAuth from "../../utils/axiosWithAuth";

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

// ******************************************* LOGIN USER

export const login = createAsyncThunk("login_user", (data, thunkAPI) => {
  return axiosWithAuth.post("/api/auth/login", data).then((response) => {
    localStorage.setItem("userId", response.data.user.id);
    localStorage.setItem("token", response.data.token);
    return response.data.user;
  });
});

// ******************************************* SIGNUP USER

export const signup = createAsyncThunk("signup_user", (data, thunkAPI) => {
  return axiosWithAuth()
    .post("/api/auth/register ", data)
    .then((response) => {
      localStorage.setItem("userId", response.data.user.id);
      return response.data.user;
    })
    .catch((err) => thunkAPI.rejectWithValue(err.response));
});

//*************************************** GOOGLE_LOGIN */

export const google_login = createAsyncThunk("goolge_login", (thunkAPI) => {
  return axiosWithAuth()
    .post("/api/oauth/login", {
      token: localStorage.getItem("token"),
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      return response.data;
    });
});

// ******************************************* GET USER BY ID
export const getUserById = createAsyncThunk("get_user_by_id", (thunkAPI) => {
  let path;
  if (localStorage.getItem("googleId"))
    path = `oauth/${localStorage.getItem("googleId")} `;
  else if (localStorage.getItem("userId"))
    path = `auth/${localStorage.getItem("userId")} `;
  if (path) {
    return axiosWithAuth()
      .get(`/api/${path}`)
      .then((response) => {
        return response.data.user;
      })
      .catch((err) => thunkAPI.rejectWithValue(err.response));
  } else {
    return "no user Id";
  }
});

// ********************************* UPDATE USER IMAGE
export const updateUser = createAsyncThunk("update_user", (image, thunkAPI) => {
  let path;
  if (localStorage.getItem("googleId"))
    path = `/?googleId=${localStorage.getItem("googleId")}`;
  else if (localStorage.getItem("userId"))
    path = `/?userId=${localStorage.getItem("userId")}`;

  return axiosWithAuth()
    .post(`/api/image${path}`, image)
    .then((response) => response.data)
    .catch((err) => thunkAPI.rejectWithValue(err.response));
});

// ************************************* UPDATE USER DATA
export const updateUserData = createAsyncThunk(
  "update_user_data",
  (data, thunkAPI) => {
    let path;
    if (localStorage.getItem("googleId"))
      path = `oauth/${localStorage.getItem("googleId")}`;
    else if (localStorage.getItem("userId"))
      path = `auth/${localStorage.getItem("userId")}`;
    return axiosWithAuth()
      .put(`/api/${path}`, data)
      .then((response) => response.data.user)
      .catch((err) => thunkAPI.rejectWithValue(err.response));
  }
);

//  -------------------------------------------------- REDUCERS -----------------------------------------------------

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    toggleNext: (state) => {
      state.NextButton = true;
    },
    toggleNextOff: (state) => {
      state.NextButton = false;
    },
    movieNext: (state, action) => {
      state.MovieSelects = action.payload;
    },
    dayNext: (state, action) => {
      state.daySelects = action.payload;
    },
    ticketsNum: (state, action) => {
      state.ticketsNumber = action.payload;
    },
    // ************************************* SEAT SELECT
    seatsArea: (state, action) => {
      state.seatsSelects = action.payload;
    },

    // ************************************** TIME SELECT
    timeSelectAction: (state, action) => {
      state.timeSelects = action.payload;
    },
  },
  extraReducers: {
    //************************************  USER LOGIN */
    [login.pending]: (state) => {
      state.fetchingData = true;
      state.error = "";
    },
    [login.fulfilled]: (state, action) => {
      state.fetchingData = false;
      state.userData = action.payload;
      state.error = "";
    },
    [login.rejected]: (state, action) => {
      state.fetchingData = false;
      state.error = action.payload;
    },

    //***************************************  USER SIGN-UP */
    [signup.pending]: (state) => {
      state.fetchingData = true;
    },
    [signup.fulfilled]: (state, action) => {
      localStorage.setItem("userId", action.payload.id);
      localStorage.setItem("token", action.payload.token);
      state.fetchingData = false;
      state.userData = action.payload;
    },
    [signup.rejected]: (state, action) => {
      state.fetchingData = false;
      state.error = action.payload;
    },

    //************************************  USER GOOGLE LOGIN */
    [google_login.pending]: (state) => {
      state.fetchingData = true;
    },
    [google_login.fulfilled]: (state, action) => {
      state.fetchingData = false;
      state.userData = action.payload.user;
    },
    [google_login.rejected]: (state, action) => {
      state.fetchingData = false;
      state.error = action.payload;
    },

    // ******************************************* GET USER BY ID
    [getUserById.pending]: (state) => {
      state.fetchingData = true;
      state.error = "";
    },
    [getUserById.fulfilled]: (state, action) => {
      state.fetchingData = false;
      state.error = "";
      state.userInfo = action.payload;
    },
    [getUserById.rejected]: (state, action) => {
      (state.fetchingData = false), (state.error = action.payload);
    },

    // ********************************* UPDATE USER IMAGE
    [updateUser.pending]: (state) => {
      state.fetchingData = true;
      state.error = "";
    },
    [updateUser.fulfilled]: (state, action) => {
      state.fetchingData = false;
      state.error = "";
      state.userInfo = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.fetchingData = false;
      stateerror = action.payload;
    },

    // ************************************* UPDATE USER DATA
    [updateUserData.pending]: (state) => {
      state.fetchingData = true;
      state.error = "";
    },
    [updateUserData.fulfilled]: (state, action) => {
      state.fetchingData = false;
      state.error = "";
      state.userInfo = action.payload;
    },
    [updateUserData.rejected]: (state, action) => {
      state.fetchingData = false;
      stateerror = action.payload;
    },
  },
});

export const {
  toggleNext,
  toggleNextOff,
  movieNext,
  dayNext,
  ticketsNum,
  seatsArea,
  timeSelectAction,
} = userSlice.actions;
export default userSlice.reducer;
