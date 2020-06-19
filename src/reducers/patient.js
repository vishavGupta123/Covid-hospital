import { UPDATE_PATIENTS, ADDING_NEW_PATIENT } from "../actions/actionTypes";

export default function patients(state = [], action) {
  switch (action.type) {
    case UPDATE_PATIENTS:
      return action.patients;
    case ADDING_NEW_PATIENT:
      return [...state, action.patient];
    default:
      return state;
  }
}
