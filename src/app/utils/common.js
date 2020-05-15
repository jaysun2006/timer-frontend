import { message } from "antd";
import axios from "axios";
import { API_URL } from "../constants/api";
import {
  AUTH_TOKEN,
  ERROR_MSG_TYPE,
  INFO_MSG_TYPE,
  SUCCESS_MSG_TYPE,
  WARNING_MSG_TYPE,
} from "../constants/dataKeys";
import {
  ERROR_MESSAGE_403,
  ERROR_MESSAGE_404,
  ERROR_MESSAGE_500,
} from "../constants/messages";

export const makeURL = (URL) => {
  return API_URL + "/" + URL;
};

export const putAPI = (URL, data, successFn, errorFn, headerConfig = {}) => {
  makeHeaderSet();
  // console.log("sending to " + makeURL(URL), data);
  axios({
    method: "put",
    url: makeURL(URL),
    data: data,
    headers: {
      // Authorization: 'Token ' + getAuthToken(),
      ...headerConfig,
    },
  })
    .then((response) => {
      // console.log(response);
      let data = response.data;
      successFn(data);
    })
    .catch((error) => {
      handleErrorResponse(error);
      errorFn(data);
    });
};

export const postAPI = (URL, data, successFn, errorFn, headerConfig = {}) => {
  makeHeaderSet();
  // console.log("sending to " + makeURL(URL), data);
  axios({
    method: "post",
    url: makeURL(URL),
    data: data,
    headers: {
      // Authorization: 'Token ' + getAuthToken(),
      ...headerConfig,
    },
  })
    .then((response) => {
      // console.log(response);
      let data = response.data;
      successFn(data);
    })
    .catch((error) => {
      console.log(error);
      handleErrorResponse(error);
      errorFn();
    });
};
export const patchAPI = (URL, data, successFn, errorFn, headerConfig = {}) => {
  // console.log("sending to " + makeURL(URL), data);
  axios({
    method: "patch",
    url: makeURL(URL),
    data: data,
    headers: {
      // Authorization: 'Token ' + getAuthToken(),
      ...headerConfig,
    },
  })
    .then((response) => {
      // console.log(response);
      let data = response.data;
      successFn(data);
    })
    .catch((error) => {
      console.log(error);
      handleErrorResponse(error);
      errorFn();
    });
};
export const getAPI = (URL, successFn, errorFn, params = {}) => {
  // console.log(getAuthToken());
  makeHeaderSet();
  axios({
    method: "get",
    url: makeURL(URL),
    headers: {
      // Authorization: 'Token ' + getAuthToken()
    },
    params: {
      ...params,
    },
  })
    .then((response) => {
      console.log(response);
      let data = response.data;
      successFn(data);
    })
    .catch((error) => {
      console.log("Error aa rhi ", error);
      handleErrorResponse(error);
      if (errorFn) errorFn();
    });
};
export const deleteAPI = (URL, successFn, errorFn) => {
  // console.log(getAuthToken());
  makeHeaderSet();
  axios({
    method: "delete",
    url: makeURL(URL),
    headers: {
      // Authorization: 'Token ' + getAuthToken()
    },
  })
    .then((response) => {
      console.log(response);
      let data = response.data;
      successFn(data);
    })
    .catch((error) => {
      console.log("Error aa rhi ", error);
      handleErrorResponse(error);
      errorFn();
    });
};

export const handleErrorResponse = (error) => {
  let response = error.response;
  if (response) {
    console.info("Error Response Recieved", response);
    let status = response.status;
    if (status === 400) {
      if (response.data.non_field_errors) {
        var errorsToShow = "";
        console.log(response.data.non_field_errors);
        response.data.non_field_errors.map((v) => {
          errorsToShow += v;
        });
        message.error(errorsToShow);
      } else if (response.data.detail) {
        message.error(response.data.detail);
      } else {
        let errorsToShow = "";
        const keysInResponseData = Object.keys(error.response.data);

        keysInResponseData.map((v) => {
          errorsToShow += error.response.data[v];
        });
        message.error(errorsToShow);
      }
    } else if (status === 401) {
      if (response.data.detail) {
        message.error(response.data.detail);
      }
    } else if (status === 403) {
      if (response.data.detail) {
        message.error(response.data.detail);
      } else {
        message.error(ERROR_MESSAGE_403);
      }
    } else if (status === 404) {
      if (response.data.detail) {
        message.error(response.data.detail);
      } else {
        message.error(ERROR_MESSAGE_404);
      }
    } else if (status === 500) {
      message.error(ERROR_MESSAGE_500);
    }
  } else {
    // message.error(ERROR_INTERNET_CONNECTIVITY);
    console.error(response);
  }
};
export const displayMessage = (type, msg) => {
  if (type === SUCCESS_MSG_TYPE) message.success(msg);
  else if (type === INFO_MSG_TYPE) message.info(msg);
  else if (type === WARNING_MSG_TYPE) message.warning(msg);
  else if (type === ERROR_MSG_TYPE) message.error(msg);
};

export const interpolate = (theString, argumentArray) => {
  var regex = /%s/;
  var _r = (p, c) => {
    return p.replace(regex, c);
  };
  return argumentArray.reduce(_r, theString);
};

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const makeHeaderSet = () => {
  let token = localStorage.getItem(AUTH_TOKEN);
  if (token) {
    setAuthorizationToken(token);
  }
};
