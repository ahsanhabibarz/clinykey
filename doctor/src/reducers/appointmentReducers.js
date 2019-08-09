import { GET_APPOINTMENTS, SET_APPOINTMENT } from "../actions/types";
const initialState = {
  appointments: null,
  myappointment: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload
      };
    case SET_APPOINTMENT:
      return {
        ...state,
        myappointment: action.payload
      };
    default:
      return state;
  }
}
