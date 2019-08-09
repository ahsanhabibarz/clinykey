import { GET_DOCTORS_PROFILES, PROFILE_LOADING } from "../actions/types";
const initialState = {
  loading: false,
  profiles: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_DOCTORS_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
