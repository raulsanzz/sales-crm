import axios from './../../axios-order';

import {
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_FAIL,
} from '../actions/types';

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchProfiles = () => async dispatch => {
  try {
    const res = await axios.get ('/api/profile');
    dispatch({
      type: FETCH_PROFILES_SUCCESS,
      payload: res.data.profiles
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROFILES_FAIL,
      payload: error
    });
  }
};

//Admin Reports API Calls
export const getApplicationReport = ( startDate, endDate, jobStatuses ) => async dispatch => {
  try {
    const body = JSON.stringify({ startDate, endDate });
    let res = await axios.put("/api/appliedJob/jobReport", body, config);
    res = await mapResponse(jobStatuses, res.data.jobReport, 'lead_status')
    return res;
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return false;
  }
};

export const getLeadReport = ( startDate, endDate, leadStatuses ) => async dispatch => {
  try {
    const body = JSON.stringify({ startDate, endDate });
    let res = await axios.put("/api/lead/leadReport", body, config);
    res = await mapResponse(leadStatuses, res.data.leadReport, 'status')
    return res;
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return false;
  }
};

export const getTestReport = ( startDate, endDate, testStatuses ) => async dispatch => {
  try {
    const body = JSON.stringify({ startDate, endDate });
    let res = await axios.put('/api/test/testReport', body, config);
    res = await mapResponse(testStatuses, res.data.testReport, 'status');
    return res;

  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return false;
  }
};

export const getInterviewReport = ( startDate, endDate, interviewStatuses ) => async dispatch => {
  try {
    const body = JSON.stringify({ startDate, endDate });
    let res = await axios.put('/api/note/callsReport', body, config);
    let res2 = await axios.put('/api/lead/technicalLeadReport', body, config);
    res = await mapResponse(interviewStatuses, res.data.callReport, 'interview_status');
    res.technicalCallReport = res2.data.leadReport
    res.closedToLegals = res2.data.closedToLegals;
    return res;
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return false;
  }
};

const mapResponse = (statuses, DbReport, attributeToCompare) => {
  let subTotal = 0;
  const report = statuses.map( status => {
    const result = foundStatusInDbReport(status, DbReport, attributeToCompare);
    if(result.length === 0){
      return {
        [attributeToCompare]: status,
        total: 0
      }
    }
    else{
      subTotal += Number(result[0].total) ;
      return result[0]
    }
  })
  return {report, subTotal};
}

const foundStatusInDbReport = (status, DbReport, attributeToCompare) => {
  let check = DbReport.filter( record => {
    return record[attributeToCompare] === status ? record : null;
  });
  return check;
}