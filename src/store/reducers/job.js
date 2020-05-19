import {
  JOB_ADD_SUCCESS,
  JOB_ADD_FAIL,
  FETCH_JOB_DATA_SUCCESS,
  FETCH_JOB_DATA_FAIL,
} from "../actions/types";

const initialState = {
  job: [],
  error: {},
  newjob: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case JOB_ADD_SUCCESS:
      return {
        ...state,
        job: state.job.concat(action.payload),
        newjob: null,
        loading: false
      };
    case FETCH_JOB_DATA_SUCCESS:
      return {
        ...state,
        job: payload,
        loading: false
      };
    case FETCH_JOB_DATA_FAIL:
    case JOB_ADD_FAIL:
      return {
        ...state,
        loading: true,
        error: payload
      };
    default:
      return state;
  }
}
