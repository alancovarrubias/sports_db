import React from 'react'
import { Provider } from 'react-redux'

import Routes from '../Routes'
import configureStore from '../configureStore'
import defaultState from '../defaultState'

const store = configureStore(defaultState)

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
)

export default App
