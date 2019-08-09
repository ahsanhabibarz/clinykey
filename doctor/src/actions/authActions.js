import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { getCurrentProfile } from "../actions/profileAction";

import { GET_ERRORS, SET_CURRENT_USER, GET_PROFILE } from "./types";

export const loginUser = (userData, history, location) => dispatch => {
  axios
    .post("/api/clients/register", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch(getCurrentProfile(history, location));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = history => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch(removeProfile());
  history.push("/");
};

export const logoutUserOnTime = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch(removeProfile());
};

export const removeProfile = () => {
  return {
    type: GET_PROFILE,
    payload: null
  };
};
