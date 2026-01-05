import axios from "axios";

const API_URL = "http://localhost:1337/api";

export const loginUser = (data) =>
  axios.post(`${API_URL}/auth/local`, data);

export const registerUser = (data) =>
  axios.post(`${API_URL}/auth/local/register`, data);
