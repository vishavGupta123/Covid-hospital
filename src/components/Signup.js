import React, { Component } from "react";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import { Redirect } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username && password) {
      this.props.dispatch(signup(username, password));
    }
  };
  render() {
    const { isLoggedin, inProgress } = this.props.auth;
    if (isLoggedin) {
      return <Redirect to="/" />;
    }
    return (
      <form className="signup-form">
        <span className="login-signup-header">Sign Up</span>
        <div className="field">
          <input
            type="text"
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
          <button onClick={this.handleFormSubmit}>Sign Up</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Signup);
