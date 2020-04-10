import axios from "axios";
import { setAlert } from "../actions/alert";

import {
  LEAD_ADD_SUCCESS,
  LEAD_ADD_FAIL,
  FETCH_LEAD_SUCCESS,
  FETCH_LEAD_FAIL
} from "../actions/types";

const BASE_URL = process.env.REACT_APP_BASE_URL;

//Add a new Lead
export const addLead = ( newLeadData ) => async dispatch => {
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
      payload: res.data.lead
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
export const fetchLeads = () => async dispatch => {
  try {
    const res = await axios.get ( BASE_URL + "/api/lead");
    dispatch({
      type: FETCH_LEAD_SUCCESS,
      payload: res.data.leads
    });
  } catch (error) {
    dispatch({
      type: FETCH_LEAD_FAIL,
      payload: error
    });
  }
};
