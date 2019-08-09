import axios from "axios";
import { GET_APPOINTMENTS, SET_APPOINTMENT } from "./types";

export const setAppointment = (oid, cid) => dispatch => {
  axios
    .post(`/api/appointment/set/${oid}`, { cid })
    .then(res => dispatch(getAppointments(oid)))
    .catch(err =>
      dispatch({
        type: SET_APPOINTMENT,
        payload: []
      })
    );
};

export const getAppointments = oid => dispatch => {
  axios
    .get(`/api/appointment/${oid}`)
    .then(res =>
      dispatch({
        type: GET_APPOINTMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_APPOINTMENTS,
        payload: []
      })
    );
};
