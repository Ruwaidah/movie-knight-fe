import React, { useState } from "react";
import "./App.scss";
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from 'react-redux'
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
import Profile from './components/profile/Profile.js';
import Team from './components/teams/Team';

function App(props) {
  const [showMenu, setShowMenu] = useState(true)
  const [oldPath, setOldPath] = useState("/")

  return (
    <div className="App">
      <Nav setShowMenu={setShowMenu} showMenu={showMenu} setOldPath={setOldPath} />
      <Switch>
      <Route path="/profile" render={(props) => <Profile {...props} setShowMenu={setShowMenu} />} />

      <Route exact path="/login" component={Login} />

      <Route exact path="/signup" component={Signup} />

      <Route exact path="/" component={Dashboard} />

      <Route exact path="/details/:movieName" component={MovieDetails} />

      <Route exact path="/details" component={MovieDetails} />

      <Route exact path="/date" component={DataPicker} />

      <Route exact path="/time" component={TimePicker} />

      <Route exact path="/seats" component={SeatChart} />

      <Route exact path="/tickets" component={Tickets} />

      <Route exact path="/showtime" component={Showtime} />

      <Route exact path="/team" component={Team} />

      <Route exact path="*" component={Dashboard} />
      </Switch>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    googleData: state.googleData,
    userData: state.userData
  };
};

export default withRouter(connect(mapStateToProps)(App))