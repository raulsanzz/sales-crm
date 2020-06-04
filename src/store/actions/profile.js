import axios from "./../../axios-order";

import {
    FETCH_PROFILES_SUCCESS,
    FETCH_PROFILES_FAIL,
} from "../actions/types";

export const fetchProfiles = () => async dispatch => {
    try {
      const res = await axios.get ("/api/profile");
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