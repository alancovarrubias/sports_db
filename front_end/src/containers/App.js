import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route } from 'react-router'
import configureStore from '../configureStore'
import { fetchSeasons } from '../actions'

import routes from '../routes'
import Layout from './Layout';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
          </Switch>
        </Router>
      </Provider>
    );
  }
}
