import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import JobReducer from './reducers/job';
import authReducer from './reducers/auth';
import userReducer from './reducers/user';
import LeadReducer from './reducers/lead';
import ProfileReducer from './reducers/profile';
import SelectOptions from './reducers/selectOptions';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  JobReducer,
  LeadReducer,
  ProfileReducer,
  SelectOptions
});

const middel = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middel))
);

export default store;
