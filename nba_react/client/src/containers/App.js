import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import { fetchSeasons } from '../actions'

import Browser from '@hickory/browser'
import { curi } from '@curi/router'
import { curiProvider } from '@curi/react-dom'
import routes from '../routes'
import Layout from './Layout';

const history = Browser();
const router = curi(history, routes);
const Router = curiProvider(router);



const store = configureStore();
store.dispatch(fetchSeasons())
  .then(() => store.getState());
  

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          {({ response }) => {
            if (response) {
              return (
                  <Layout response={response} router={router} />
                );
            }
           }}
        </Router>
      </Provider>
    )
  }
}
