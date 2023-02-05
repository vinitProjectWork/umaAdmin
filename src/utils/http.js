import axios from "axios"
import { removeFromLS, getFromLS } from "./functions"

export const baseURL = "http://localhost:1337"

const http = axios.create({
  baseURL,
  withCredentials: true
})

http.defaults.headers.common["Content-Type"] = "application/json"

const responseErrorCallback = ({ response }) => {
  const expectedError =
    response && response.status >= 400 && response.status < 500

  if (!expectedError) {
  }

  // Check Authoriazation
  if (
    (response.status === 403 && getFromLS("user")) ||
    (!getFromLS("user") && window.isLoggedIn)
  ) {
    removeFromLS("user")

    // const homePage = process.env.PUBLIC_URL

    // window.location.href = `${homePage}/sign-in`
  }

  return Promise.reject(response.data)
}

// Response Errors
http.interceptors.response.use(null, responseErrorCallback)

// http.interceptors.request.use((config) => {
//   return config;
// }, null);

export { http }
