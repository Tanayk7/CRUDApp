import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import "./Login.css";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../Redux";
import { Redirect } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.login.authenticated);

  const responseGoogle = (response) => {
    let creds = {
      email: response.profileObj.email,
      name: response.profileObj.name,
    };
    dispatch(loginUser(creds));
  };

  return authenticated ? (
    <Redirect to="/home"></Redirect>
  ) : (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">
          Login with your Google account to proceed
        </h1>
        <GoogleLogin
          clientId="258203014303-naduja8f3i7408380lka7s5kc1hhb5no.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
};

export default Login;
