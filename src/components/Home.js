import React, { Component } from "react";
import { Link } from "react-router-dom";
import { addNewPatient } from "../actions/patient";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientName: "",
      mobileNumber: "",
      status: "Healthy",
    };
  }
  handleNameChange = (e) => {
    this.setState({
      patientName: e.target.value,
    });
  };

  handlePhoneNumber = (e) => {
    this.setState({
      mobileNumber: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { patientName, mobileNumber } = this.state;
    console.log("i am props", this.props);
    this.props.dispatch(addNewPatient(patientName, mobileNumber));
  };
  render() {
    console.log(this.state);
    const { patients, auth } = this.props;
    return (
      <div>
        <h1 className="heading-phone">Phone Number of each patient</h1>
        <ul className="patient-phone-numbers">
          {patients.map((patient, index) => (
            <li key={index}>
              Name:{patient.name}
              <div>
                <Link to={`/patient/${patient._id}`}>
                  {patient.mobileNumber}
                </Link>
              </div>
            </li>
          ))}
        </ul>

        {auth.isLoggedin && (
          <div>
            <form className="login-form">
              <span className="login-signup-header"> ADD A NEW PATIENT </span>
              <div className="field">
                <input
                  type="text"
                  placeholder="patient name"
                  onChange={this.handleNameChange}
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  placeholder="patient phone number"
                  onChange={this.handlePhoneNumber}
                />
              </div>

              <div className="field">
                <button onClick={this.handleFormSubmit}>Add New Patient</button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
