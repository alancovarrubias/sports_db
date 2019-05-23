import React from 'react';
import { Provider } from 'react-redux';

import Routes from '../Routes';
import configureStore from '../configureStore';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
