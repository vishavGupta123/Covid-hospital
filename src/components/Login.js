import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  handleUsernameChange = (e) => {
    console.log(e.target.value);
    this.setState({
      username: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    console.log(e.target.value);
    this.setState({
      password: e.target.value,
    });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username && password) {
      this.props.dispatch(login(username, password));
    }
  };
  render() {
    const { inProgress, isLoggedin } = this.props.auth;
    console.log("IS Logged in", this.props);
    console.log("LOCATION", this.props.location);
    if (isLoggedin) {
      return <Redirect to="/" />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header"> Log In </span>
        <div className="field">
          <input
            type="username"
            placeholder="username"
            required
            onChange={this.handleUsernameChange}
            value={this.state.username}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="password"
            required
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Loggin in...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit}> LOG IN </button>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToprops(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToprops)(Login);
