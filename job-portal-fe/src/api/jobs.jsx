import axios from "axios";

const API_URL = "http://localhost:1337/api";

export const getJobs = () =>
  axios.get(`${API_URL}/jobs?populate=company`);
