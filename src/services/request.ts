import axios from "axios";
import { get } from "lodash";

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 50000,
});

// TODO: Use token
request.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        // Authorization: process.env.REACT_APP_TOKEN,
      },
    };
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = get(error, "response.data.error_message", error.message);
    const status = get(error, "response.status");

    console.log("Message: ", message);
    console.log("Status: ", status);

    throw error;
  }
);

export default request;
