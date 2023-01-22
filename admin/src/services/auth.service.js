import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL+"auth/";

const register = (first_name, last_name, email, password) => {
  return axios.post(API_URL + "signup", {
    first_name, 
    last_name,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios.post(API_URL + "signin", {
      email,
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

const authService = {
  register,
  login,
  logout,
};

export default authService;
