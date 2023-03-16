
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

 const login = (username, password) => {
  return axios
    .post(API_URL + "authenticate", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  logout,
  getCurrentUser,
};
