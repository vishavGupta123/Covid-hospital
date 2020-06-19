import {
  LOGIN_DOCTOR,
  LOGIN_START,
  AUTHENTICATE_DOCTOR,
  LOG_OUT,
} from "./actionTypes";
import { getFormBody } from "../helpers/utils";

export function login(username, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = "http://localhost:8000/api/doctors/login";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Doctor", data.data.doctor);
        if (data) {
          localStorage.setItem("token", data.data.data.token);
          dispatch(loginSuccess(data.data.doctor));
          return;
        }
      });
  };
}

export function authenticateDoctor(doctor) {
  return {
    type: AUTHENTICATE_DOCTOR,
    doctor,
  };
}

export function loginSuccess(doctor) {
  return {
    type: LOGIN_DOCTOR,
    doctor,
  };
}
export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function logoutDoctor(doctor) {
  return {
    type: LOG_OUT,
  };
}

export function signup(username, password) {
  return (dispatch) => {
    const url = "http://localhost:8000/api/doctors/register";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.doctor, "HEY I AM THE NEW DOCTOR");
        dispatch(signupSuccessfull());
      });
  };
}

export function signupSuccessfull() {
  return {
    type: "SIGNUP_SUCCESSFULL",
  };
}
