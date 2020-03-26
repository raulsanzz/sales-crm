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
  LEAD_UPDATE_SUCCESS,
  LEAD_UPDATE_FAIL
} from "../actions/types";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchJob = () => async dispatch => {
  try {
    const res = await axios.get ( BASE_URL + "/api/job/user_daily_job_created");
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

export const addJob = ( newJob ) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ newJob });

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

export const updateJob = (
  id,
  company_name,
  url,
  profile,
  job_title,
  salary,
  history
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    id,
    company_name,
    url,
    profile,
    job_title,
    salary
  });

  try {
    await axios.post ( BASE_URL + "/api/job/edit", body, config);

    dispatch({
      type: JOB_UPDATE_SUCCESS
    });

    history.push("/admin_job_list/");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg));
      });
    }

    dispatch({
      type: JOB_UPDATE_FAIL
    });
  }
};

//update lead

export const updateLead = (
  id,
  profile,
  job_title,
  salary,
  source,
  email,
  website,
  client_name,
  phone_number,
  call_time,
  time_zone,
  call_date,
  history
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    id,
    profile,
    job_title,
    salary,
    source,
    email,
    website,
    client_name,
    phone_number,
    call_time,
    time_zone,
    call_date
  });

  try {
    await axios.post ( BASE_URL + "/api/job/lead/edit", body, config);

    dispatch({
      type: LEAD_UPDATE_SUCCESS
    });

    history.push("/leads_list/");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg));
      });
    }

    dispatch({
      type: LEAD_UPDATE_FAIL
    });
  }
};
export const UpdateJobStatus = ( id, updatedData ) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    updatedData
  });
  try {
    await axios.put ( BASE_URL + "/api/job/updateStatus/" + id, body, config);
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