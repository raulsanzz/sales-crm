import axios from "axios";
import { setAlert } from "../actions/alert";

import {
  JOB_ADD_SUCCESS,
  JOB_ADD_FAIL,
  FETCH_JOB_DATA_SUCCESS,
  FETCH_JOB_DATA_FAIL,
  JOB_DELETE_SUCCESS,
  JOB_DELETE_FAIL,
  JOB_UPDATE_SUCCESS,
  JOB_UPDATE_FAIL,
} from "../actions/types";

const BASE_URL = process.env.REACT_APP_BASE_URL;

//Add a new job
export const addJob = ( newJobData, newClientData ) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ newJobData, newClientData });

  try {
    const res = await axios.post ( BASE_URL + "/api/job", body, config);
    dispatch({
      type: JOB_ADD_SUCCESS,
      payload: res.data.job
    });
    return 1;
  } 
  catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg));
      });
    }
    dispatch({
      type: JOB_ADD_FAIL
    });
    return 0;
  }
};

//fetch all jobs
export const fetchJob = () => async dispatch => {
  try {
    const res = await axios.get ( BASE_URL + "/api/job");
    dispatch({
      type: FETCH_JOB_DATA_SUCCESS,
      payload: res.data.result
    });
  } catch (error) {
    dispatch({
      type: FETCH_JOB_DATA_FAIL
    });
  }
};

//Update a Job 
export const updateJob = ( id, updatedData ) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    updatedData
  });
  try {
    await axios.put ( BASE_URL + "/api/job/update/" + id, body, config);
    dispatch({ type: JOB_UPDATE_SUCCESS });
    return 1;
  } 

  catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg)); });
    }
    dispatch({ type: JOB_UPDATE_FAIL });
    return 0;
  }
};

//delete a Job
export const deleteJob = id => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    id
  });
  try {
    await axios.post ( BASE_URL + "/api/job/delete", body, config);

    dispatch({
      type: JOB_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: JOB_DELETE_FAIL
    });
  }
};