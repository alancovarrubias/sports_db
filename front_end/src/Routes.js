import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from './containers/Navbar';
import Seasons from './containers/Seasons';
import Games from './containers/Games';
import Game from './containers/Game';

const Routes = () => (
  <Router>
    <Route path="/" component={Navbar} />
    <Switch>
      <Redirect from="/" to="/seasons" exact />
      <Route path="/seasons" component={Seasons} exact />
      <Route path="/seasons/:season/games" component={Games} exact />
      <Route path="/seasons/:season/games/:game" component={Game} exact />
    </Switch>
  </Router>
);

export default Routes;
