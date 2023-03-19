import React from 'react';
import AuthService from '../services/AuthService';

const Profile = ({ user }) => {
  const handleLogout = () => {
    AuthService.logout();
    window.location.href = "/";
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>
        Welcome, {user.firstName} {user.lastName}! You are logged in with role: User
      </p>

      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
