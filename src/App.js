import React from 'react';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import store from './store/store';
import AppRouter from './routers/AppRouter';
import { loadUser } from './store/actions/auth';

if (localStorage.token) {
  store.dispatch(loadUser());
}

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT
};

export default () => {
  return (
    <Provider template={AlertTemplate} {...options}>
      <AppRouter />
    </Provider>
  );  
};
