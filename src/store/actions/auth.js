
import axios from './../../axios-order';
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

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
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
  const body = JSON.stringify({ newUser });
  try {
    const res = await axios.post( "/api/user", body, config);
    const data = {
      token: res.data.token,
      user: [{...res.data.user}]
    }
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data
    });
    setAuthToken(data.token);
    return true;
  } catch (error) {
    dispatch({ type: REGISTER_FAIL });
    return false;
  }
};

export const logIn = (newUser) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ newUser });  
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    setAuthToken(res.data.token);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL});
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
