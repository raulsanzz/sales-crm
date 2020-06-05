import axios from './../../axios-order';

import {
  JOB_ADD_SUCCESS,
  JOB_ADD_FAIL,
  FETCH_JOB_DATA_SUCCESS,
  FETCH_JOB_DATA_FAIL,
  JOB_ACTION_START
} from '../actions/types';

//Add a new job
export const addJob = ( newJobData, newClientData ) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ newJobData, newClientData });
  try {
    const res = await axios.post ('/api/job', body, config);
    dispatch({
      type: JOB_ADD_SUCCESS,
      payload: res.data.job
    });
    return 1;
  } 
  catch (error) {
    dispatch({ type: JOB_ADD_FAIL });
    return 0;
  }
};

//fetch all jobs
export const fetchJob = () => async dispatch => {
  dispatch({ type: JOB_ACTION_START });
  try {
    const res = await axios.get ('/api/job');
    dispatch({
      type: FETCH_JOB_DATA_SUCCESS,
      payload: res.data.result
    });
  } catch (error) {
    dispatch({ type: FETCH_JOB_DATA_FAIL });
  }
};

//update an applied Job
export const updateAppliedJob = (query, updatedData, shouldUpdateUser, clientData) => async (dispatch) => {
   const config = {
      headers: { 'Content-Type': 'application/json' }
    };
    const body = JSON.stringify({ query, updatedData, shouldUpdateUser, clientData});
    try {
      const res =  await axios.put ('/api/appliedjob', body, config);
      if(res.data.updatedJob.length === 1){
        return true;
      }
    } 
    catch (error) {
      console.log(error);
      return false;
    }
};

