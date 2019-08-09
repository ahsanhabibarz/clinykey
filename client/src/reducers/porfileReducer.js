import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_PRESCRIPTIONS
} from "../actions/types";
const initialState = {
  profile: null,
  prescriptions: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PRESCRIPTIONS:
      return {
        ...state,
        prescriptions: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
