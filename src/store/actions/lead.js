import axios from './../../axios-order';

import {
  LEAD_ACTION_START,
  LEAD_ADD_SUCCESS,
  LEAD_ADD_FAIL,
  LEAD_FETCH_SUCCESS,
  LEAD_FETCH_FAIL,
  LEAD_UPDATE_SUCCESS,
  LEAD_UPDATE_FAIL
} from '../actions/types';

//Add a new Lead
export const addLead = ( newLeadData ) => async dispatch => {
  dispatch({ type: LEAD_ACTION_START });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ newLeadData });

  try {
    const res = await axios.post ('/api/lead', body, config);
    dispatch({
      type: LEAD_ADD_SUCCESS,
      payload: res.data.newLead
    });
    return true;
  } 
  catch (error) {
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
    dispatch({ type: LEAD_ACTION_START });
  }
  try {
    const res = await axios.get ('/api/lead');
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
    dispatch({ type: LEAD_ACTION_START });
  }
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ query, newLeadData, newCallData, newClientData });

  try {
    await axios.put ('/api/lead', body, config);
    dispatch({
      type: LEAD_UPDATE_SUCCESS,
      payload: { lead_id: query.lead_id, newLeadData, newCallData, newClientData }
    });
    return true;
  } 
  catch (error) {
    dispatch({
      type: LEAD_UPDATE_FAIL,
      payload: error
    });
    return false;
  }
};