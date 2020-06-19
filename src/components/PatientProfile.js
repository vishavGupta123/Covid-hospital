import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPatientProfile, createReport } from "../actions/patient";

class PatientProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      successMessage: null,
      status: "",
      date: "",
    };
  }
  handleStatus = (e) => {
    this.setState({
      status: e.target.value,
    });
  };
  handleDateChange = (e) => {
    this.setState({
      date: e.target.value,
    });
  };
  componentDidMount() {
    const { match } = this.props;
    if (match.params.patientId) {
      //dispatch an action
      this.props.dispatch(fetchPatientProfile(match.params.patientId));
    }
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps.report);
    console.log(this.props.report);
    const prevReport = prevProps.report;
    const newReport = this.props.report;
    if (prevReport && newReport && prevReport !== newReport) {
      this.props.dispatch(
        fetchPatientProfile(this.props.match.params.patientId)
      );
    }
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { status, date } = this.state;
    const { match } = this.props;
    if (status && date) {
      this.props.dispatch(createReport(status, date, match.params.patientId));
    }
  };
  render() {
    const profile = this.props.patient_profile;
    console.log(profile);
    const {
      match: { params },
    } = this.props;
    console.log("this.props", this.props);
    console.log("This is a new State", this.state);
    if (
      profile.patient.report !== null &&
      profile.patient.report !== undefined
    ) {
      return (
        <div className="patient-report-status">
          <div>
            <span className="patient-details">Name of the patient:</span>
            {profile.patient.name}
          </div>
          <div>
            <span className="patient-details">
              Health Status of the patient:
            </span>
            {profile.patient.report.Status}
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="patient-profile-info">
          Patient Name: {profile.patient.name}
          Patient Mobile Number:{profile.patient.mobileNumber}
        </div>

        <form className="login-form">
          <span className="login-signup-header">Report</span>
          <div className="field">
            <select onClick={this.handleStatus} required>
              <option value="Healthy">Healthy</option>
              <option value="Quarantined">Quarantined</option>
              <option value="Infected">Infected</option>
              <option value="Not Infected">Not_Infected</option>
            </select>
          </div>
          <div className="field">
            <input type="date" onChange={this.handleDateChange} required />
          </div>
          <div className="field">
            <button onClick={this.handleFormSubmit}>Enter status</button>
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps({ patient_profile, report }) {
  return {
    patient_profile,
    report,
  };
}

export default connect(mapStateToProps)(PatientProfile);
