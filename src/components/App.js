import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./AppNavbar";
import Home from "./Home";
import Profile from "./Profile";
import Register from "./Register";
import Login from "./Login";
import AuthService from "../services/AuthService";
import PatientList from "./PatientList";
import PatientEdit from "./PatientEdit";
import ErrorBoundary from "../services/ErrorBoundary";

class RegisterPage extends Component {
  render() {
    return <Register setUser={this.props.setUser} />;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: AuthService.getCurrentUser(),
    };
    this.setUser = this.setUser.bind(this);
  }

  setUser(user) {
    this.setState({
      user: user,
    });

  
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar user={this.state.user} setUser={this.setUser} />
          <div className="container mt-3">
            <Fragment>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/getPatients"
                  element={ <PatientList user={this.state.user} />}
                />

                <Route
                  path="/api/patients/updatePatient/:id"
                  element={<PatientEdit />}
                />
                <Route
                  path="/profile"
                  element={<Profile user={this.setUser} />}
                />
                <Route
                  path="/register"
                  element={<RegisterPage setUser={this.setUser} />}
                />

                
                <Route  
                  path="/login"
                  element={<Login setUser={this.setUser}
                   />}
                />
              </Routes>
            </Fragment>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default function AppWithBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}


