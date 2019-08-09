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
import DoctorsList from "./components/pages/DoctorsList";
import Doctor from "./components/pages/Doctor";
import Prescriptions from "./components/pages/Prescriptions";
import Clinydoc from "./components/pages/Clinydoc";

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
                <Route exact path="/createprofile" component={CreateProfile} />
                <Route exact path="/" component={DoctorsList} />
                <Route exact path="/prescriptions" component={Prescriptions} />
                <Route exact path="/doctor/:oid" component={Doctor} />
              </main>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
