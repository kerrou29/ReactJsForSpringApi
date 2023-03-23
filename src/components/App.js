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
    console.log("User set:", user);
  
  }

  componentDidMount() {
    console.log("Component mounted");
    const user = AuthService.getCurrentUser();
    console.log("User from local storage:", user);
    if (user) {
      this.setState({
        user: user,
      });
    }
  }

  render() {
    console.log("User in state:", this.state.user);

    return (
        <div className="App">
          <Navbar user={this.state.user} setUser={this.setUser} />
          <div className="container mt-3">
            <Fragment>
              <BrowserRouter>
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
              </BrowserRouter>
            </Fragment>
          </div>
        </div>
    );
  }
}

export default App;


