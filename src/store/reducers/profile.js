import {
    FETCH_PROFILES_SUCCESS,
    FETCH_PROFILES_FAIL,
  } from "../actions/types";
  
  const initialState = {
    profiles: [],
    error: {},
    loading: true
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case FETCH_PROFILES_SUCCESS:
        return {
          ...state,
          profiles: payload,
          loading: false,
          error: null,
        };
      case FETCH_PROFILES_FAIL:
        return {
          ...state,
          loading: false,
          error: payload
        };
      default:
        return state;
    }
  }
  