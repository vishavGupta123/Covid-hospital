import { CREATE_REPORT_SUCCESSFULL } from "../actions/actionTypes";

export default function report(state = {}, action) {
  switch (action.type) {
    case CREATE_REPORT_SUCCESSFULL:
      return action.report;
    default:
      return state;
  }
}
