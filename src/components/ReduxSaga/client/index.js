import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import Shop from './components/Shop';

import './styles/main.sass';

const ReduxSaga = () => (
  <Provider store={store}>
    <Shop />
  </Provider>
);

export default ReduxSaga;