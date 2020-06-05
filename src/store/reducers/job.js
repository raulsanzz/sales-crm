import {
  JOB_ADD_SUCCESS,
  JOB_ADD_FAIL,
  FETCH_JOB_DATA_SUCCESS,
  FETCH_JOB_DATA_FAIL,
  JOB_ACTION_START,
} from '../actions/types';

const initialState = {
  job: [],
  error: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case JOB_ACTION_START:
      return {
        ...state,
        loading: true
      };
    case JOB_ADD_SUCCESS:
      return {
        ...state,
        job: state.job.concat(action.payload),
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
        loading: false,
        error: payload
      };
    default:
      return state;
  }
}
