

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    AuthService.login(username, password).then(
      (response) => {
        setUser(response);
        navigate("/");
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

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

    <div>
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
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    )}

    {message && (
      <div className="alert alert-danger mt-3" role="alert">
        {message}
      </div>
    )}
  </form>
</div>

);
};

export default Login;

        
