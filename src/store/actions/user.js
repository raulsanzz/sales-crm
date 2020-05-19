import axios from "axios";
import { setAlert } from "../actions/alert";

import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../actions/types";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get ( BASE_URL + "/api/user");

    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: res.data.result
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_FAIL
    });
  }
};

export const deleteUser = id => async dispatch => {
  try {
    const res = await axios.delete( BASE_URL + `/api/user/${id}`);

    dispatch({
      type: USER_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL
    });
  }
};

export const updateUser = ( id, updatedData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    updatedData
  });

  try {
    await axios.put ( BASE_URL + "/api/user/edit/" + id, body, config);
    dispatch({
      type: USER_UPDATE_SUCCESS
    });
    return true;
  } 
  catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg));
      });
    }
    dispatch({
      type: USER_UPDATE_FAIL
    });
    return false;
  }
};
export const updateUserPassword = ( id, updatedData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    updatedData
  });

  try {
    await axios.put ( BASE_URL + "/api/user/edit/password/" + id, body, config);
    dispatch({
      type: USER_UPDATE_SUCCESS
    });
    return true;
  } 
  catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg));
      });
    }
    dispatch({
      type: USER_UPDATE_FAIL
    });
    return false;
  }
};