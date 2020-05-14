import axios from "axios";
import { setAlert } from "../actions/alert";

import {
  LEAD_ACTION_START,
  LEAD_ADD_SUCCESS,
  LEAD_ADD_FAIL,
  LEAD_FETCH_SUCCESS,
  LEAD_FETCH_FAIL,
  LEAD_UPDATE_SUCCESS,
  LEAD_UPDATE_FAIL
} from "../actions/types";

const BASE_URL = process.env.REACT_APP_BASE_URL;

//Add a new Lead
export const addLead = ( newLeadData ) => async dispatch => {
  dispatch({
    type: LEAD_ACTION_START,
  });
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ newLeadData });

  try {
    const res = await axios.post ( BASE_URL + "/api/lead", body, config);
    dispatch({
      type: LEAD_ADD_SUCCESS,
      payload: res.data.newLead
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
      type: LEAD_ADD_FAIL,
      payload: error
    });
    return false;
  }
};

//fetch all leads
export const fetchLeads = (shouldDispatchActionStarter) => async dispatch => {
  if(shouldDispatchActionStarter){
    dispatch({
      type: LEAD_ACTION_START,
    });
  }
  try {
    const res = await axios.get ( BASE_URL + "/api/lead");
    dispatch({
      type: LEAD_FETCH_SUCCESS,
      payload: res.data.leads
    });
  } catch (error) {
    dispatch({
      type: LEAD_FETCH_FAIL,
      payload: error
    });
  }
};

//update lead
export const updateLead = ( query, newLeadData, newCallData, newClientData, shouldDispatchActionStarter ) => async dispatch => {
  if(shouldDispatchActionStarter !== false){
    dispatch({
      type: LEAD_ACTION_START,
    });
  }
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ query, newLeadData, newCallData, newClientData });

  try {
    await axios.put ( BASE_URL + "/api/lead", body, config);
    dispatch({
      type: LEAD_UPDATE_SUCCESS,
      payload: { lead_id: query.lead_id, newLeadData, newCallData, newClientData }
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
      type: LEAD_UPDATE_FAIL,
      payload: error
    });
    return false;
  }
};