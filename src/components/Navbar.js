import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutDoctor } from "../actions/auth";

class Navbar extends Component {
  handleLogout = (e) => {
    localStorage.removeItem("token");
    this.props.dispatch(logoutDoctor());
  };
  render() {
    const { auth } = this.props;
    const { isLoggedin, doctor } = auth;
    return (
      <div className="nav">
        <div className="left-div">
          <Link to="/">
            <img
              src="https://www.flaticon.com/premium-icon/icons/svg/2873/2873632.svg"
              alt="logo"
            />
          </Link>
          <h3>Covid Hospital</h3>
        </div>
        {isLoggedin && <div style={{ color: "white" }}>{doctor.username}</div>}
        <div className="nav-links">
          <ul>
            {isLoggedin ? (
              <li onClick={this.handleLogout}>Log out</li>
            ) : (
              <li>
                <Link to="/login">Log In</Link>
              </li>
            )}
            {!isLoggedin ? (
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Navbar);
