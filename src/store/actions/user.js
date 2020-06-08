
import axios from '../../axios-order';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from './types';

import setAuthToken from '../../utills/setAuthToken';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/user/getme');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const signUp = (newUser) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ newUser });
  try {
    const res = await axios.post( '/api/user/signup', body, config);
    const data = {
      token: res.data.token,
      user: [{...res.data.user}]
    }
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data
    });
    setAuthToken(data.token);
    return true;
  } catch (error) {
    dispatch({ type: REGISTER_FAIL });
    return false;
  }
};

export const logIn = (newUser) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ newUser });  
  try {
    const res = await axios.post('/api/user/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    setAuthToken(res.data.token);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL});
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get ("/api/user");
    return res.data.users;
  } catch (error) {
    return false;
  }
};

export const deleteUser = id => async dispatch => {
  try {
    await axios.delete(`/api/user/${id}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const updateUser = ( id, updatedData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ updatedData });

  try {
    await axios.put ( "/api/user/edit/" + id, body, config);
    return true;
  } 
  catch (error) {
    return false;
  }
};

export const updateUserPassword = ( id, updatedData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ updatedData });
  try {
    await axios.put ("/api/user/edit/password/" + id, body, config);
    return true;
  } 
  catch (error) {
    return false;
  }
};