import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import authReducer from "../reducers/auth";
import userReducer from "../reducers/user";
import alertReducer from "../reducers/alert";
import JobReducer from "../reducers/job";

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  alertReducer,
  JobReducer
});
const middel = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middel))
);

export default store;
