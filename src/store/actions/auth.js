import axios from "axios";
import { setAlert } from "../actions/alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from "../actions/types";
import setAuthToken from "../../utills/setAuthToken";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get ( BASE_URL + "/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const signUp = (newUser) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    newUser
  });
  try {
    const res = await axios.post ( BASE_URL + "/api/user", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
    return true
  } catch (error) {
    const errors = error.response.data.errors;
    const error1 = error.response.data.msg;
    if (error1) {
      dispatch(setAlert(error));
    }
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg));
      });
    }

    dispatch({
      type: REGISTER_FAIL
    });
    return false
  }
};

export const logIn = (
newUser
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    newUser
  });
  
  console.log(BASE_URL);  
  try {
    const res = await axios.post( BASE_URL + "/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());

    // history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    const error1 = error.response.data.msg;
    if (error1) {
      dispatch(setAlert(error));
    }
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg));
      });
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
