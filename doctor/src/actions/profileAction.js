import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_DOCTORS_PROFILES,
  GET_PRESCRIPTIONS,
  GET_MEDS
} from "./types";

export const updateUserProfile = (userData, history, location) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post("/api/doctor/profile/update", userData)
    .then(res => {
      if (location.pathname === "/createprofile") {
        history.push("/profile");
      }
      dispatch({
        type: GET_DOCTORS_PROFILES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const addChamber = (userData, history) => dispatch => {
  axios
    .post("/api/doctor/addchamber", userData)
    .then(res => {
      history.push("/profile");
    })
    .catch(err => {
      console.log(err);
    });
};

export const createUserProfile = (userData, history) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post("/api/patient/profile/create", userData)
    .then(res => {
      dispatch(setProfile(res.data));
      history.push("/profile");
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const getPatientProfile = pid => dispatch => {
  dispatch(setProfileLoading());
  console.log(pid + "action");

  axios.post("/api/patient/id", { pid }).then(res => {
    if (Object.keys(res.data).length > 0) {
      dispatch(setProfile(res.data));
    } else {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    }
  });
};

export const getMedicinesSuggestion = med => dispatch => {
  axios.post("/api/scraper", { med }).then(res => {
    if (Object.keys(res.data).length > 0) {
      dispatch({
        type: GET_MEDS,
        payload: res.data
      });
    } else {
      dispatch({
        type: GET_MEDS,
        payload: []
      });
    }
  });
};

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/doctor/profile/all")
    .then(res =>
      dispatch({
        type: GET_DOCTORS_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DOCTORS_PROFILES,
        payload: null
      })
    );
};

export const getPrescriptions = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/prescription")
    .then(res =>
      dispatch({
        type: GET_PRESCRIPTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PRESCRIPTIONS,
        payload: null
      })
    );
};

export const getProfilesBySearch = sarchkey => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/doctor/profile/all/${sarchkey}`)
    .then(res =>
      dispatch({
        type: GET_DOCTORS_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_DOCTORS_PROFILES,
        payload: null
      })
    );
};

// Get Doctors Profile By Id
export const getProfileByOid = (oid, history, location) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/doctor/profile/${oid}`)
    .then(res => {
      if (Object.keys(res.data).length > 0) {
        localStorage.setItem("mydocprofile", JSON.stringify(res.data));
        dispatch({
          type: GET_DOCTORS_PROFILES,
          payload: res.data
        });
      } else {
        history.push("/createprofile");
        dispatch({
          type: GET_DOCTORS_PROFILES,
          payload: {}
        });
      }
    })
    .catch(err =>
      dispatch({
        type: GET_DOCTORS_PROFILES,
        payload: null
      })
    );
};

export const getProfileByOidChamber = (oid, history) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/doctor/profile/${oid}`)
    .then(res => {
      console.log(res.data);
      if (Object.keys(res.data).length > 0) {
        dispatch({
          type: GET_DOCTORS_PROFILES,
          payload: res.data
        });
      } else {
        history.push("/createprofile");
        console.log("else");
      }
    })
    .catch(err =>
      dispatch({
        type: GET_DOCTORS_PROFILES,
        payload: null
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const setProfile = data => {
  return {
    type: GET_PROFILE,
    payload: data
  };
};
export const setDocProfile = data => {
  return {
    type: GET_DOCTORS_PROFILES,
    payload: data
  };
};
