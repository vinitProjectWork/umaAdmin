import axios from "axios";
import { removeFromLS, getFromLS } from "./functions";

// export const baseURL = "https://1f5d-2405-201-2024-d030-5c0e-1e9d-88d3-7100.in.ngrok.io"
export const baseURL = "https://api.umaenterpriseindia.com";
// export const baseURL = "http://localhost:1337";
// export const baseURL = "https://0a43-42-106-14-153.in.ngrok.io/api/v1/users";

const http = axios.create({
  baseURL,
  withCredentials: true,
});

http.defaults.headers.common["Content-Type"] = "application/json";
if (localStorage.getItem("access_token")) {
  http.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");
}

const responseErrorCallback = ({ response }) => {
  const expectedError =
    response && response.status >= 400 && response.status < 500;

  if (!expectedError) {
  }

  // Check Authoriazation
  if (
    (response.status === 403 && getFromLS("user")) ||
    (!getFromLS("user") && window.isLoggedIn)
  ) {
    removeFromLS("user");

    // const homePage = process.env.PUBLIC_URL

    // window.location.href = `${homePage}/sign-in`
  }

  return Promise.reject(response.data);
};

// Response Errors
http.interceptors.response.use(null, responseErrorCallback);

// http.interceptors.request.use((config) => {
//   return config;
// }, null);

export { http };
