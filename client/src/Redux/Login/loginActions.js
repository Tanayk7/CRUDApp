import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
} from "./loginTypes";
import axios from "axios";

export const userLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

export const userLoginSuccess = (session_data) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: session_data,
  };
};

export const userLoginFailure = () => {
  return {
    type: USER_LOGIN_FAILURE,
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const loginUser = (creds) => {
  return (dispatch) => {
    dispatch(userLoginRequest());
    axios
      .post("http://localhost:5000/login", creds)
      .then((res) => {
        console.log(res.data);
        dispatch(userLoginSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(userLoginFailure());
      });
  };
};
