import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'

import configureStore, { history } from '../configureStore'
import Navbar from '../containers/Navbar'
import Seasons from '../containers/Seasons'
import Games from '../containers/Games'
import Stats from '../containers/Stats'

const store = configureStore()
const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={Navbar} />
      <Switch>
        <Redirect from="/" to="/seasons" exact />
        <Route path="/seasons" component={Seasons} exact />
        <Route path="/seasons/:seasonId/games" component={Games} exact />
        <Route path="/seasons/:seasonId/games/:gameId" component={Stats} exact />
      </Switch>
    </ConnectedRouter>
  </Provider>
)

export default App
