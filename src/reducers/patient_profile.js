import {
  PATIENT_PROFILE_SUCCESS,
  FETCH_PATIENT_PROFILE,
} from "../actions/actionTypes";

const initialProfileState = {
  patient: {},
  error: null,
  success: null,
  inProgress: false,
};

export default function profile(state = initialProfileState, action) {
  switch (action.type) {
    case PATIENT_PROFILE_SUCCESS:
      return {
        ...state,
        success: true,
        patient: action.patient,
        inProgress: false,
      };
    case FETCH_PATIENT_PROFILE:
      return {
        ...state,
        inProgress: true,
      };
    default:
      return state;
  }
}
