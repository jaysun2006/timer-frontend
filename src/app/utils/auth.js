import axios from "axios";
import { LOGIN_URL, SIGNUP_URL, USER_DATA_API } from "../constants/api";
import { AUTH_TOKEN, ROLE } from "../constants/dataKeys";
import { handleErrorResponse, makeURL, setAuthorizationToken } from "./common";

export const loggedInUser = () => {
  let role = localStorage.getItem(ROLE);
  let token = localStorage.getItem(AUTH_TOKEN);
  if (role && token) {
    return role;
  }
  return null;
};
export const logOutUser = (successFn, errorFn) => {
  localStorage.removeItem(ROLE);
  localStorage.removeItem(AUTH_TOKEN);
  successFn();
};

export const logInUser = (data, successFn, errorFn) => {
  let token = null;

  axios
    .post(makeURL(LOGIN_URL), data)
    .then((response) => {
      // console.log(response);
      let data = response.data;
      token = data.key;
      setAuthorizationToken(token);
      return axios.get(makeURL(USER_DATA_API));
    })
    .then((response) => {
      let data = response.data;
      localStorage.setItem(ROLE, JSON.stringify(data));
      localStorage.setItem(AUTH_TOKEN, token);
      successFn();
    })
    .catch((error) => {
      console.log(error);
      handleErrorResponse(error);

      errorFn();
    });
};

export const singUpUser = (data, successFn, errorFn) => {
  console.log("workign");

  axios
    .post(makeURL(SIGNUP_URL), data)
    .then((response) => {
      successFn();
    })
    .catch((error) => {
      console.log(error);
      handleErrorResponse(error);
      errorFn();
    });
};

export const getAuthToken = () => {
  let token = localStorage.getItem(AUTH_TOKEN);
  return token;
};
