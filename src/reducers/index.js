import {
  USER_SIGNING_GOOGLE,
  USER_SIGNING_GOOGLE_SUCCESS,
  USER_SIGNING_GOOGLE_FAILURE,
  USER_LOGING_IN,
  USER_LOGING_IN_SUCCESS,
  USER_LOGING_IN_FAILURE,
  USER_SIGNING,
  USER_SIGNING_SUCCESS,
  USER_SIGNING_FAILURE,
  // GET_MOVIES_START,
  // GET_MOVIES_SUCCESS,
  // GET_MOVIES_FAILURE,
  GET_MOVIE_DETAIL_START,
  GET_MOVIE_DETAIL_SUCCESS,
  GET_MOVIE_DETAIL_FAILURE,
  GET_MOVIES_UPCOMING_START,
  GET_MOVIES_UPCOMING_SUCCESS,
  GET_MOVIES_UPCOMING_FAILURE,
  TOGGLE_NEXT_BUTTON,
  TOGGLE_NEXT_OFF,
  MOVIE_NEXT_BUTTON,
  DAY_NEXT_BUTTON,
  TICKETS_NEXT_BUTTON,
  SEATS_NEXT_BUTTON,
  USER_BYID_LOADING,
  USER_BYID_SUCCESS,
  USER_BYID_FAILURE,
  TIME_NEXT_BUTTON,
  GET_SHOWTIMES_RESULTS_LOADING,
  GET_SHOWTIMES_RESULTS_SUCCESS,
  GET_SHOWTIMES_RESULTS_FAILED,

} from "../actions/index";

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
  userInfo: null
};

const reducer = (state = initialState, action) => {
  console.log(action.type)
  switch (action.type) {
    //GOOGLE SIGN UP/
    case USER_SIGNING_GOOGLE:
      return {
        ...state,
        fetchingData: true,
      };

    case USER_SIGNING_GOOGLE_SUCCESS:
      console.log(action.payload.user.googleId)
      localStorage.setItem("googleId", action.payload.user.googleId);
      return {
        ...state,
        fetchingData: false,
        // googleData: action.payload,
        userData: action.payload.user
      };
    case USER_SIGNING_GOOGLE_FAILURE:
      return {
        ...state,
        fetchingData: false,
        error: action.payload
      };

    //*************************USER LOGIN */
    case USER_LOGING_IN:
      return {
        ...state,
        fetchingData: true,
        error: ""
      };

    case USER_LOGING_IN_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        userData: action.payload,
        error: ""
      };

    case USER_LOGING_IN_FAILURE:
      return {
        ...state,
        fetchingData: false,
        error: action.payload
      };

    //*************************USER SIGN-UP */
    case USER_SIGNING:
      return {
        ...state,
        fetchingData: true
      };

    case USER_SIGNING_SUCCESS:
      localStorage.setItem("userId", action.payload.id);
      return {
        ...state,
        fetchingData: false,
        userData: action.payload
      };

    case USER_SIGNING_FAILURE:
      return {
        ...state,
        fetchingData: false,
        error: action.payload
      };


    //*************************** GET MOVIES//
    // case GET_MOVIES_START:
    //   return {
    //     ...state,
    //     fetchingData: true
    //   };
    // case GET_MOVIES_SUCCESS:
    //   return {
    //     ...state,
    //     fetchingData: false,
    //     movieList: action.payload
    //   };
    // case GET_MOVIES_FAILURE:
    //   return {
    //     ...state,
    //     fetchingData: false,
    //     error: action.payload
    //   };

    //********************** GET MOVIE DETAILS */
    case GET_MOVIE_DETAIL_START:
      return {
        ...state,
        fetchingData: true
      };

    case GET_MOVIE_DETAIL_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        movieDetails: action.payload
      };

    case GET_MOVIE_DETAIL_FAILURE:
      return {
        ...state,
        fetchingData: false,
        error: action.payload
      };

    //**************************** GET UPCOMING MOVIES */
    case GET_MOVIES_UPCOMING_START:
      return {
        ...state,
        fetchingData: true
      };

    case GET_MOVIES_UPCOMING_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        upcomingMovies: action.payload
      };

    case GET_MOVIES_UPCOMING_FAILURE:
      return {
        ...state,
        fetchingData: false,
        error: action.payload
      };

    // ******************************** Next Button Show
    case TOGGLE_NEXT_BUTTON:
      return {
        ...state,
        NextButton: true
      };


    // ******************************** Next Button invisible
    case TOGGLE_NEXT_OFF:
      return {
        ...state,
        NextButton: false
      };

    // *********************************** Movies Selected
    case MOVIE_NEXT_BUTTON:
      return {
        ...state,
        MovieSelects: action.payload
      };

    //  *********************************** Days Selected
    case DAY_NEXT_BUTTON:
      return {
        ...state,
        daySelects: action.payload
      };

    case TICKETS_NEXT_BUTTON:
      return {
        ...state,
        ticketsNumber: action.payload
      }

    //  *********************************** Seats Selected
    case SEATS_NEXT_BUTTON:
      return {
        ...state,
        seatsSelects: action.payload
      }


    // ************************************** Get User By ID

    case USER_BYID_LOADING:
      return {
        ...state,
        fetchingData: true,
        error: ""
      }

    case USER_BYID_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        error: "",
        userInfo: action.payload
      }

    case USER_BYID_FAILURE:
      return {
        ...state,
        fetchingData: false,
        error: action.payload
      }

    // ****************************** TIME SELECT
    case TIME_NEXT_BUTTON:
      return {
        ...state,
        timeSelects: action.payload
      }


    //  ******************************************** Get Results
    case GET_SHOWTIMES_RESULTS_LOADING:
      return {
        ...state,
        fetchingData: true,
        error: ""
      }

    case GET_SHOWTIMES_RESULTS_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        error: "",
        results: action.payload[0],
        theatres: action.payload[1]
      }

    case GET_SHOWTIMES_RESULTS_FAILED:
      return {
        ...state,
        fetchingData: false,
        error: action.payload
      }



    default:
      return state;
  }
};

export default reducer;
