import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import AuthService from '../services/AuthService';

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    AuthService.logout();
    this.setState({ currentUser: null });
    window.location.href = '/';

  }

  render() {
    const { currentUser } = this.state;

    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Home</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/getPatients">Patients</NavLink>
          </NavItem>
        </Nav>
        {currentUser ? (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#" onClick={this.handleLogout}>
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        ) : (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/register">Register</NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    );
  }
}
