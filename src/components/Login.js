import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    AuthService.login(email, password).then(
      (response) => {
        setLoading(false);
        if (response) {
          navigate("/getPatients");
        } else {
          setMessage("Invalid email or password");
        }
      },
      (error) => {
        console.log(error);
        setLoading(false);
        setMessage("An error occurred while logging in");
      }
    );
  };


  const validateInputs = () => {
    if (!email || !password) {
      setMessage("Please fill in all fields");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Invalid email address");
      return false;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
  )
}
   
export default Login;
