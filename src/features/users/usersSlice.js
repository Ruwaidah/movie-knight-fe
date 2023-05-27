import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosWithAuth from "../../utils/axiosWithAuth";

const initialState = {
  movieList: [],
  userData: {},
  fetchingData: false,
  error: null,
  googleData: {},
  NextButton: false,
  movieDetails: {},
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

export const signUp = createAsyncThunk("signup_user", (data, thunkAPI) => {
  return axiosWithAuth()
    .post("/api/auth/register ", data)
    .then((response) => {
      localStorage.setItem("userId", response.data.user.id);
      return response.data.user;
    })
    .catch((err) => thunkAPI.rejectWithValue(err.response));
});

//*************************************** GOOGLE_LOGIN */

export const signUpGoogle = createAsyncThunk("goolge_login", (thunkAPI) => {
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
  },
  extraReducers: (builder) => {
    //************************************  USER LOGIN */
    builder
      .addCase(login.pending, (state) => {
        state.fetchingData = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.fetchingData = false;
        state.userData = action.payload;
        state.error = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.fetchingData = false;
        state.error = action.payload;
      })

      //***************************************  USER SIGN-UP */
      .addCase(signUp.pending, (state) => {
        state.fetchingData = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        localStorage.setItem("userId", action.payload.id);
        localStorage.setItem("token", action.payload.token);
        state.fetchingData = false;
        state.userData = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.fetchingData = false;
        state.error = action.payload;
      })
      //************************************  USER GOOGLE LOGIN */
      .addCase(signUpGoogle.pending, (state) => {
        state.fetchingData = true;
      })
      .addCase(signUpGoogle.fulfilled, (state, action) => {
        state.fetchingData = false;
        state.userData = action.payload.user;
      })
      .addCase(signUpGoogle.rejected, (state, action) => {
        state.fetchingData = false;
        state.error = action.payload;
      })
      // ******************************************* GET USER BY ID

      .addCase(getUserById.pending, (state) => {
        state.fetchingData = true;
        state.error = "";
      })

      .addCase(getUserById.fulfilled, (state, action) => {
        state.fetchingData = false;
        state.error = "";
        state.userInfo = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.fetchingData = false;
        state.error = action.payload;
      })
      // ********************************* UPDATE USER IMAGE
      .addCase(updateUser.pending, (state) => {
        state.fetchingData = true;
        state.error = "";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.fetchingData = false;
        state.error = "";
        state.userInfo = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.fetchingData = false;
        state.error = action.payload;
      })
      // ************************************* UPDATE USER DATA
      .addCase(updateUserData.pending, (state) => {
        state.fetchingData = true;
        state.error = "";
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.fetchingData = false;
        state.error = "";
        state.userInfo = action.payload;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.fetchingData = false;
        state.error = action.payload;
      });
  },
});

export const {
  toggleNext,
  toggleNextOff,
} = userSlice.actions;
export default userSlice.reducer;
