import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    AuthService.register(firstName, lastName, email, password).then(
      (response) => {
        setMessage("Registration successful");
        setLoading(false);
        navigate("/login");
      },
      (error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(errorMessage);
        setLoading(false);
      }
    );
  };

  const validateInputs = () => {
    if (!firstName || !lastName || !email || !password) {
      setMessage("Please fill in all fields");
      return false;
    }

    if (!/^[a-zA-Z ]+$/.test(firstName)) {
      setMessage("Invalid first name. Only letters and spaces are allowed.");
      return false;
    }

    if (!/^[a-zA-Z ]+$/.test(lastName)) {
      setMessage("Invalid last name. Only letters and spaces are allowed.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Invalid email address");
      return false;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
      setMessage("Password must contain at least 8 characters, including letters, numbers, and special characters");
      return false;
    }

    return true;
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <button type="submit" className="btn btn-primary" onClick={validateInputs}>
            Register
          </button>
        )}
         
         {message && (
          <div className="alert alert-danger mt-3" role="alert">
            {message}
          </div>
        )}
      </form>
    </div>
  )
}
   
export default Register;