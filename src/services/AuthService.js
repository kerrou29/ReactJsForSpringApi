import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = "http://localhost:8080/api/auth/";

const register = (firstName, lastName, email, password) => {
  return axios.post(API_URL + "register", {
    firstName,
    lastName,
    email,
    password,
  });
};

const login = async (email, password) => {
  const response = await axios
    .post(API_URL + "authenticate", {
      email,
      password,
    });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    const decodedToken = jwtDecode(user.accessToken);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("user");
    } else {
      return user;
    }
  }
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
