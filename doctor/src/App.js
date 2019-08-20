import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUserOnTime } from "./actions/authActions";
import { setProfile } from "./actions/profileAction";

import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import store from "./store";
import Profile from "./components/pages/Profile";
import CreateProfile from "./components/pages/CreateProfile";
import ChamberList from "./components/pages/ChamberList";
import MyPatients from "./components/pages/MyPatients";
import Prescriptions from "./components/pages/Prescriptions";
import AddChamber from "./components/pages/AddChamber";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUserOnTime());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = "/";
  }
}

if (localStorage.myprofile) {
  store.dispatch(setProfile(JSON.parse(localStorage.myprofile)));
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="container-fluid">
            <div className="row">
              <SideBar />
              <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
                <NavBar />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/addchamber" component={AddChamber} />
                <Route exact path="/createprofile" component={CreateProfile} />
                <Route exact path="/" component={ChamberList} />
                <Route exact path="/prescriptions" component={Prescriptions} />
                <Route exact path="/mypatients/:cid" component={MyPatients} />
              </main>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
