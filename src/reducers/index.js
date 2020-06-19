import { combineReducers } from "redux";
import patients from "./patient";
import auth from "./auth";
import patient_profile from "./patient_profile";
import report from "./report";

export default combineReducers({
  patients,
  auth,
  patient_profile,
  report,
});
