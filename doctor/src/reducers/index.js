import { combineReducers } from "redux";
import navReducer from "./navReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./porfileReducer";
import appointmentReducers from "./appointmentReducers";
import docprofileReducers from "./docprofileReducers";

export default combineReducers({
  nav: navReducer,
  auth: authReducer,
  errors: errorReducer,
  patientprofile: profileReducer,
  docprofile: docprofileReducers,
  appointment: appointmentReducers
});
