import {
  UPDATE_PATIENTS,
  PATIENT_PROFILE_SUCCESS,
  FETCH_PATIENT_PROFILE,
  ADDING_NEW_PATIENT,
  CREATE_REPORT_SUCCESSFULL,
} from "./actionTypes";
import { getAuthTokenFromLocalStorage, getFormBody } from "../helpers/utils";

export function fetchPatients() {
  return (dispatch) => {
    const url = "http://localhost:8000/api";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(updatePatients(data.data.patients));
      });
  };
}

export function updatePatients(patients) {
  return {
    type: UPDATE_PATIENTS,
    patients,
  };
}

export function startPatientProfileFetch() {
  return {
    type: FETCH_PATIENT_PROFILE,
  };
}

export function patientProfileSuccess(patient) {
  return {
    type: PATIENT_PROFILE_SUCCESS,
    patient,
  };
}

export function fetchPatientProfile(patientId) {
  return (dispatch) => {
    dispatch(startPatientProfileFetch());
    const url = `http://localhost:8000/api/patients/${patientId}`;
    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(patientProfileSuccess(data.data.patient));
      });
  };
}

export function addNewPatient(name, mobileNumber) {
  console.log("I AM MOBILE", mobileNumber);
  return (dispatch) => {
    const url = "http://localhost:8000/api/register_patient";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ name, mobileNumber }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addingThePatient(data.patient));
      });
  };
}

export function addingThePatient(patient) {
  return {
    type: ADDING_NEW_PATIENT,
    patient,
  };
}

export function createReport(status, date, patientId) {
  console.log("This is the patient id ", patientId);
  return (dispatch) => {
    const url = `http://localhost:8000/api/patients/${patientId}/create_report`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ status, date }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(createReportSuccessful(data.report));
      });
  };
}

export function createReportSuccessful(report) {
  return {
    type: CREATE_REPORT_SUCCESSFULL,
    report,
  };
}
