import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const authenticated = useSelector((state) => state.login.authenticated);
  return (
    <Route
      path={props.path}
      render={(data) =>
        authenticated ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to="/"> </Redirect>
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
