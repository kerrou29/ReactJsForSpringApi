import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = "/api/auth/";

const register = (firstName, lastName, email, password) => {
  return axios.post(API_URL + "register", {
    firstName,
    lastName,
    email,
    password,
  });
};

const login = async (email, password) => {
  console.log("login function called with email: ", email);

  const response = await axios
    .post(API_URL + "authenticate", {
      email,
      password,
    });
  if (response.data.accessToken) {
    localStorage.setItem("user", response.data);

  }
  console.log('User logged in:', response.data);

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User:", user);

  if (user && user.accessToken) {
    const decodedToken = jwtDecode(user.accessToken);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("user");
    } else {
      return JSON.parse(user);
    }
  }
  return null;
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
