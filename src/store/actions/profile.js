import axios from "axios";

import {
    FETCH_PROFILES_SUCCESS,
    FETCH_PROFILES_FAIL,
} from "../actions/types";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchProfiles = () => async dispatch => {
    try {
      const res = await axios.get ( BASE_URL + "/api/profile");
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