import {
  LOGIN_DOCTOR,
  LOGIN_START,
  AUTHENTICATE_DOCTOR,
  LOG_OUT,
  SIGNUP_SUCCESSFULL,
} from "../actions/actionTypes";

const intialAuthState = {
  doctor: {},
  error: null,
  isLoggedin: false,
  inProgress: false,
};

export default function auth(state = intialAuthState, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_DOCTOR:
      return {
        ...state,
        doctor: action.doctor,
        isLoggedin: true,
        inProgress: false,
        error: null,
      };
    case AUTHENTICATE_DOCTOR:
      return {
        ...state,
        doctor: action.doctor,
        isLoggedin: true,
      };
    case LOG_OUT:
      return {
        ...state,
        doctor: {},
        isLoggedin: false,
      };
    case SIGNUP_SUCCESSFULL:
      return {
        ...state,
        isLoggedin: true,
        inProgress: false,
        doctor: action.doctor,
      };
    default:
      return {
        ...state,
      };
  }
}
