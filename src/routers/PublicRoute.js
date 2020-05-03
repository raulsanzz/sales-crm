import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import NavMain from "../components/user/NavMain";

export const PublicRoute = ({ isAuth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuth ? (
        <Redirect to="/dashboard" />
      ) : (
        <NavMain>
          <Component {...props} />
        </NavMain>
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuth: state.authReducer.isAuth
});

export default connect(mapStateToProps)(PublicRoute);
