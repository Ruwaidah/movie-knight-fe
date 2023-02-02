import axiosWithAuth from "../utils/axiosWithAuth";
import { createBrowserHistory } from "history";
import axios from "axios";

export const history = createBrowserHistory();
export const USER_LOGING_IN = "USER_LOGING_IN";
export const USER_LOGING_IN_SUCCESS = "USER_LOGING_IN_SUCCESS";
export const USER_LOGING_IN_FAILURE = "USER_LOGING_IN_FAILURE";


export const login = loginData => async (dispatch) => {
  // dispatch({ type: USER_LOGING_IN });
  await axiosWithAuth()
    .post("/api/auth/login", loginData)
    .then(response => {
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("token", response.data.token);
      dispatch(
        { type: USER_LOGING_IN_SUCCESS, payload: response.data.user }
      )
    }
    )
  // .catch(err => {
  //   console.log(err)
  //   dispatch({ type: USER_LOGING_IN_FAILURE, payload: err.response })
  // }
  // );
};

export const USER_SIGNING = "USER_SIGNING";
export const USER_SIGNING_SUCCESS = "USER_SIGNING_SUCCESS";
export const USER_SIGNING_FAILURE = "USER_SIGNING_FAILURE";

export const signUp = signUpData => async (dispatch) => {
  dispatch({ type: USER_SIGNING });

  await axiosWithAuth()
    .post("/api/auth/register ", signUpData)
    .then(response => {
      localStorage.setItem("userId", response.data.user.id);
      dispatch(
        { type: USER_SIGNING_SUCCESS, payload: response.data.user },
        localStorage.setItem("token", response.data.token)
      )
    }
    )
    .catch(err =>
      dispatch({ type: USER_SIGNING_FAILURE, payload: err.response })
    );
};


// ******************************************* GET USER BY ID
export const USER_BYID_LOADING = "USER_BYID_LOADING";
export const USER_BYID_SUCCESS = "USER_BYID_SUCCESS";
export const USER_BYID_FAILURE = "USER_BYID_FAILURE";

export const getUserById = () => async (dispatch) => {
  let path;
  dispatch({ type: USER_BYID_LOADING });
  if (localStorage.getItem("googleId"))
    path = `oauth/${localStorage.getItem("googleId")} `
  else if (localStorage.getItem("userId"))
    path = `auth/${localStorage.getItem("userId")} `

  if (path) {
    await axiosWithAuth()
      .get(`/api/${path}`)
      .then(response => {
        dispatch(
          { type: USER_BYID_SUCCESS, payload: response.data.user },
        )
      }
      )
      .catch(err =>
        dispatch({ type: USER_BYID_FAILURE, payload: err.response })
      );
  }
  else {
    dispatch(
      { type: USER_BYID_FAILURE, payload: "no user Id" })
  }

};


// *********************************************************** UPDATE USER IMAGE


export const updateUser = image => async (dispatch) => {
  let path
  if (localStorage.getItem("googleId"))
    path = `/?googleId=${localStorage.getItem("googleId")}`
  else if (localStorage.getItem("userId"))
    path = `/?userId=${localStorage.getItem("userId")}`


  dispatch({ type: USER_BYID_LOADING });

  await axiosWithAuth()
    .post(`/api/image${path}`, image)
    .then(response => {
      dispatch({ type: USER_BYID_SUCCESS, payload: response.data })
    }
    )
    .catch(err =>
      dispatch({ type: USER_BYID_FAILURE, payload: err.response })
    );
};


// ****************************************************** UPDATE USER DATA
export const updateUserData = data => async (dispatch) => {
  let path
  if (localStorage.getItem("googleId"))
    path = `oauth/${localStorage.getItem("googleId")}`
  else if (localStorage.getItem("userId"))
    path = `auth/${localStorage.getItem("userId")}`


  dispatch({ type: USER_BYID_LOADING });

  await axiosWithAuth()
    .put(`/api/${path}`, data)
    .then(response => {
      dispatch({ type: USER_BYID_SUCCESS, payload: response.data.user })
    }
    )
    .catch(err =>
      dispatch({ type: USER_BYID_FAILURE, payload: err.response })
    );
};



//GOOGLE_LOGIN
export const USER_SIGNING_GOOGLE = "USER_SIGNING_GOOGLE";
export const USER_SIGNING_GOOGLE_SUCCESS = "USER_SIGNING_GOOGLE_SUCCESS";
export const USER_SIGNING_GOOGLE_FAILURE = "USER_SIGNING_GOOGLE_FAILURE";

export const signUpGoogle = signUpData => async (dispatch) => {
  dispatch({ type: USER_SIGNING_GOOGLE, payload: signUpData });
  await axiosWithAuth()
    .post("/api/oauth/login", {
      token: localStorage.getItem("token")
    })
    .then(response => {
      console.log(response.data)
      localStorage.setItem("token", response.data.token);
      return dispatch({ type: USER_SIGNING_GOOGLE_SUCCESS, payload: response.data })
    }
    )

};



//GET MOVIES WIHTOUT LOGIN//
// export const GET_MOVIES_START = "GET_MOVIES_START";
// export const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";
// export const GET_MOVIES_FAILURE = "GET_MOVIES_FAILURE";

// export const getMovie = zipcode => dispatch => {
//   if (localStorage.getItem("zip") == null) zipcode = 47712;
//   dispatch({ type: GET_MOVIES_START });

//   axiosWithAuth()
//     .get(`/api/movies?zip=${zipcode}`)
//     .then(response => {
//       console.log(response);
//       dispatch({ type: GET_MOVIES_SUCCESS, payload: response.data });
//     })
//     .catch(err =>
//       dispatch({ type: GET_MOVIES_FAILURE, payload: err.response })
//     );
// };

// GET MOVIE DETAIL
export const GET_MOVIE_DETAIL_START = "GET_MOVIE_DETAIL_START";
export const GET_MOVIE_DETAIL_SUCCESS = "GET_MOVIE_DETAIL_SUCCESS";
export const GET_MOVIE_DETAIL_FAILURE = "GET_MOVIE_DETAIL_FAILURE";

export const getMovieDetail = movieName => async dispatch => {
  dispatch({ type: GET_MOVIE_DETAIL_START });
  await axiosWithAuth()
    .post(`/api/movies/moviedetails`, {
      title: `${movieName}`
    })
    .then(respone =>
      dispatch({ type: GET_MOVIE_DETAIL_SUCCESS, payload: respone.data })
    )
    .catch(err =>
      dispatch({ type: GET_MOVIE_DETAIL_FAILURE, payload: err.respone })
    );
};

// GET UPCOMING MOVIES
export const GET_MOVIES_UPCOMING_START = "GET_MOVIES_UPCOMING_START";
export const GET_MOVIES_UPCOMING_SUCCESS = "GET_MOVIES_UPCOMING_SUCCESS";
export const GET_MOVIES_UPCOMING_FAILURE = "GET_MOVIES_UPCOMING_FAILURE";

export const getUpcomingMovies = () => async (dispatch) => {
  dispatch({ type: GET_MOVIES_UPCOMING_START });
  await axiosWithAuth()
    .get(`/api/upcoming`)
    .then(respone =>
      dispatch({ type: GET_MOVIES_UPCOMING_SUCCESS, payload: respone.data })
    )
    .catch(err =>
      dispatch({ type: GET_MOVIES_UPCOMING_FAILURE, payload: err.respone })
    );
};

export const TOGGLE_NEXT_BUTTON = "TOGGLE_NEXT_BUTTON";

export const toggleNext = () => dispatch => {
  dispatch({ type: TOGGLE_NEXT_BUTTON });
};

export const TOGGLE_NEXT_OFF = "TOGGLE_NEXT_OFF";

export const toggleNextOff = () => dispatch => {
  dispatch({ type: TOGGLE_NEXT_OFF });
};

export const MOVIE_NEXT_BUTTON = "MOVIE_NEXT_BUTTON";

export const movieNext = movies => dispatch => {
  dispatch({ type: MOVIE_NEXT_BUTTON, payload: movies });
};

export const DAY_NEXT_BUTTON = "DAY_NEXT_BUTTON";

export const dayNext = days => dispatch => {
  dispatch({ type: DAY_NEXT_BUTTON, payload: days });
};



export const TICKETS_NEXT_BUTTON = 'TICKETS_NEXT_BUTTON'

export const ticketsNum = num => dispatch => {
  dispatch({ type: TICKETS_NEXT_BUTTON, payload: num })
}


// ************************************************* SEAT SELECT
export const SEATS_NEXT_BUTTON = 'SEATS_NEXT_BUTTON'

export const seatsArea = seats => dispatch => {
  dispatch({ type: SEATS_NEXT_BUTTON, payload: seats })
}


// ************************************************* TIME SELECT
export const TIME_NEXT_BUTTON = 'TIME_NEXT_BUTTON'

export const timeSelectAction = time => dispatch => {
  dispatch({ type: TIME_NEXT_BUTTON, payload: time })
}


// ******************************************************** SHOWTIMES RESULT
export const GET_SHOWTIMES_RESULTS_LOADING = "GET_SHOWTIMES_RESULTS_LOADING";
export const GET_SHOWTIMES_RESULTS_SUCCESS = "GET_SHOWTIMES_RESULTS_SUCCESS";
export const GET_SHOWTIMES_RESULTS_FAILED = "GET_SHOWTIMES_RESULTS_FAILED";

export const getShowTimesRsults = (data) => async dispatch => {
  let theatres = []
  const zipcode = localStorage.getItem("zip") || "47712"
  dispatch({ type: GET_SHOWTIMES_RESULTS_LOADING });
  await axiosWithAuth()
    .post(`/api/filtermovies?zip=${zipcode}`, data)
    .then(respone => {
      console.log(respone.data)
      respone.data.map(movies => movies.showtimes.map(theater => theatres.push(theater.id)))
      console.log(theatres)
      theatres = theatres.filter(thea => thea.length > 0)
      console.log(theatres)
      if (theatres.length == 0) dispatch({ type: GET_SHOWTIMES_RESULTS_SUCCESS, payload: [respone.data, theatres] })
      else {
        axiosWithAuth().post("/api/theaters", { theatres: theatres }).then(data1 => {
          dispatch({ type: GET_SHOWTIMES_RESULTS_SUCCESS, payload: [respone.data, data1.data] })
        }).catch(err =>
          dispatch({ type: GET_SHOWTIMES_RESULTS_FAILED, payload: err.respone })
        );
      }
    }
    )
    .catch(err =>
      dispatch({ type: GET_SHOWTIMES_RESULTS_FAILED, payload: err.respone })
    );
};



// ******************************************* ADD FAVORITE THEATRES
export const ADD_FAVORITE_THEATRES_SUCCESS = "ADD_FAVORITE_THEATRES_SUCCESS";

export const addfavoriteTheatres = (data) => dispatch => {

  console.log(data)
  let path;
  if (localStorage.getItem("googleId"))
    path = `googleId=${localStorage.getItem("googleId")} `
  else if (localStorage.getItem("userId"))
    path = `userId=${localStorage.getItem("userId")} `
  axiosWithAuth()
    .post(`/api/theatres/favorite?${path}`, data)
    .then(response => console.log(response.data)
    )
    .catch(err =>
      console.log(err));
};



// ***************************************************** DELETE FAVORITE THEATRE
export const delfavoriteTheatres = (id) => dispatch => {

  console.log(id)
  let path;
  if (localStorage.getItem("googleId"))
    path = localStorage.getItem("googleId")
  else if (localStorage.getItem("userId"))
    path = localStorage.getItem("userId")
  axiosWithAuth()
    .delete(`/api/theatres/favorite?userid=${path}&theaterid=${id}`)
    .then(response => console.log(response.data)
    )
    .catch(err =>
      console.log(err));
};
