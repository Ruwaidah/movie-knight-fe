import React, { useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/movieDashboard/Dashboard";
import Nav from "./components/progress-nav-bars/Nav";
import MovieDetails from "./components/movieDetails/MovieDetails.js";
import PrivateRoute from "./components/PrivateRoute";
import DataPicker from "./components/date-time/DatePicker";
import TimePicker from "./components/date-time/TimePicker";
import SeatChart from "./components/seats/SeatChart";
import Tickets from "./components/tickets/Tickets";
import Showtime from "./components/showTimes/Showtime.js";
import Profile from "./components/profile/Profile.js";
import Team from "./components/teams/Team";

function App() {
  const [showMenu, setShowMenu] = useState(true);
  const [oldPath, setOldPath] = useState("/");

  return (
    <div className="App">
      <Nav
        setShowMenu={setShowMenu}
        showMenu={showMenu}
        setOldPath={setOldPath}
      />
      <Routes>
        <Route
          path="/profile"
          render={(props) => <Profile {...props} setShowMenu={setShowMenu} />}
        />

        <Route  path="/login" component={Login} />

        <Route  path="/signup" component={Signup} />

        <Route  path="/" component={Dashboard} />

        <Route  path="/details/:movieName" component={MovieDetails} />

        <Route  path="/details" component={MovieDetails} />

        <Route  path="/date" component={DataPicker} />

        <Route  path="/time" component={TimePicker} />

        <Route  path="/seats" component={SeatChart} />

        <Route  path="/tickets" component={Tickets} />

        <Route  path="/showtime" component={Showtime} />

        <Route  path="/team" component={Team} />

        <Route  path="*" component={Dashboard} />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    googleData: state.googleData,
    userData: state.userData,
  };
};

// export default withRouter(connect(mapStateToProps)(App));
export default App;
