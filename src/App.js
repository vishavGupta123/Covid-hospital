import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { fetchPatients } from "./actions/patient";
import * as jwtDecode from "jwt-decode";
import { authenticateDoctor } from "./actions/auth";

import { Home, Navbar, Login, Signup, PatientProfile } from "./components";
import "./App.css";
import { getAuthTokenFromLocalStorage } from "./helpers/utils";

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPatients());
    const token = getAuthTokenFromLocalStorage();
    if (token) {
      const doctor = jwtDecode(token);
      console.log("DOCTOR IN CDM", doctor);
      this.props.dispatch(
        authenticateDoctor({
          username: doctor.username,
          _id: doctor._id,
        })
      );
    }
  }

  render() {
    console.log("PROPS", this.props);
    const { patients, auth } = this.props;
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => {
              return (
                <Home
                  {...props}
                  patients={patients}
                  auth={auth}
                  dispatch={this.props.dispatch}
                />
              );
            }}
          />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute
            path="/patient/:patientId"
            component={PatientProfile}
            isLoggedin={auth.isLoggedin}
          />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    patients: state.patients,
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(App);
