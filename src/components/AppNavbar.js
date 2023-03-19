// // import React, {Component} from 'react';
// // import {Navbar, NavbarBrand} from 'reactstrap';
// // import {Link} from 'react-router-dom';

// // export default class AppNavbar extends Component {
// //     constructor(props) {
// //         super(props);
// //         this.state = {isOpen: false};
// //         this.toggle = this.toggle.bind(this);
// //     }

// //     toggle() {
// //         this.setState({
// //             isOpen: !this.state.isOpen
// //         });
// //     }

// //     render() {
// //         return <Navbar title='Home' color="dark" dark expand="md">
// //             <NavbarBrand tag={Link} to="/login">Login</NavbarBrand>

// //         </Navbar>;
// //     }
// // }

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
// import AuthService from '../services/AuthService';

// const AppNavBar = () => {
//   const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

//   const handleLogout = () => {
//     AuthService.logout();
//     setCurrentUser(null);
//   };

//   return (
//     <Navbar bg="light" expand="lg">
//       <Navbar.Brand as={Link} to="/">
//         My App
//       </Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="mr-auto">
//           <Nav.Link as={Link} to="/">
//             Home
//           </Nav.Link>
//         </Nav>
//         {currentUser ? (
//           <NavDropdown title={`Welcome, ${currentUser.firstName}`} id="basic-nav-dropdown">
//             <NavDropdown.Item as={Link} to="/profile">
//               Profile
//             </NavDropdown.Item>
//             <NavDropdown.Divider />
//             <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
//           </NavDropdown>
//         ) : (
//           <Nav>
//             <Button as={Link} to="/login" variant="outline-primary">
//               Login
//             </Button>
//             <Button as={Link} to="/register" variant="primary" className="ml-2">
//               Register
//             </Button>
//           </Nav>
//         )}
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

// export default AppNavBar;

import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class AppNavbar extends Component {
  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Home</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/getPatients">Patients</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/register">Register</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

