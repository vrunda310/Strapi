import axios from "axios";

const API_URL = "http://localhost:1337/api";

export const applyJob = (jobId, token) =>
  axios.post(
    `${API_URL}/job-applications`,
    { data: { job: jobId } },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getApplications = (token) =>
  axios.get(
    `${API_URL}/job-applications?populate=job.company`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
