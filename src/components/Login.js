import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { withRouter } from './withRouter';
import authService from '../services/AuthService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
      event.preventDefault();
      const { email, password } = this.state;
    
      try {
        const user = await authService.login(email, password);
        if (user) {
          // redirect to the desired page after login
          window.location.href = '/getPatients';
        } else {
          this.setState({
            error: 'Invalid email or password'
          });
        }
      } catch (error) {
        console.log(error);
        this.setState({
          error: 'An error occurred while logging in'
        });
      }
    }
    
    // event.preventDefault();
    // const { email, password } = this.state;


    // try {
    //   const response = await fetch('/api/auth/authenticate', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       password: password
    //     })
    //   });
      

    //   if (response.status === 200) {
    //     const data = await response.json();
      
    //   // Set user object in local storage
    //   localStorage.setItem('user', JSON.stringify(data.user));
    //   console.log('User logged in:', response.data);


        
    //   } else {
    //     const error = await response.json();
    //     this.setState({
    //       error: error.message
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  

  //window.location.href = '/getPatients';


  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          {this.state.error && <p>{this.state.error}</p>}
          <Button type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(Login);
