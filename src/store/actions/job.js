import axios from "axios";
import { setAlert } from "../actions/alert";

import {
  JOB_ADD_SUCCESS,
  JOB_ADD_FAIL,
  FETCH_JOB_DATA_SUCCESS,
  FETCH_JOB_DATA_FAIL,
  JOB_ACTION_START
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
  dispatch({
    type: JOB_ACTION_START
  });
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

//update an applied Job
export const updateAppliedJob = (query, updatedData, shouldUpdateUser, clientData) => async (dispatch) => {
   const config = {
      headers: { "Content-Type": "application/json" }
    };
    const body = JSON.stringify({ query, updatedData, shouldUpdateUser, clientData});
    try {
      const res =  await axios.put ( BASE_URL + "/api/appliedjob", body, config);
      if(res.data.updatedJob.length === 1){
        return true;
      }
    } 
    catch (error) {
      console.log(error);
      return false;
    }
};

