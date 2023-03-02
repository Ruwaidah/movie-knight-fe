import React, { useState } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
// import { connect } from "react-redux";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/movieDashboard/Dashboard";
import Nav from "./components/progress-nav-bars/Nav";
import MovieDetails from "./components/movieDetails/MovieDetails.js";
// import s from "./components/PrivateRoute";
import DataPicker from "./components/date-time/DatePicker";
import TimePicker from "./components/date-time/TimePicker";
import SeatChart from "./components/seats/SeatChart";
import Tickets from "./components/tickets/Tickets";
import Showtime from "./components/showTimes/Showtime.js";
import Profile from "./components/profile/Profile.js";
import Team from "./components/teams/Team";

function App() {
  const [showMenu, setShowMenu] = useState(true);
  // const [oldPath, setOldPath] = useState("/");
  return (
    <div className="App">
      <Nav
        setShowMenu={setShowMenu}
        showMenu={showMenu}
        // setOldPath={setOldPath}
      />
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/profile"
          render={(props) => <Profile {...props} setShowMenu={setShowMenu} />}
        />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/details/:movieTitle" element={<MovieDetails />} />

        <Route path="/details" element={<MovieDetails />} />

        <Route path="/date" element={<DataPicker />} />

        <Route path="/time" element={<TimePicker />} />

        <Route path="/seats" element={<SeatChart />} />

        <Route path="/tickets" element={<Tickets />} />

        <Route path="/showtime" element={<Showtime />} />

        <Route path="/team" element={<Team />} />

        {/* <Route path="*" component={Dashboard} /> */}
      </Routes>
    </div>
  );
}

export default App;
