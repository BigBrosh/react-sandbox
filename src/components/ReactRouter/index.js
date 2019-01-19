import { Switch, Route, Router } from 'react-router';

import Home from './Home/Home';

import React from 'react';
import About from './About/About';

import createBrowserHistory from 'history/createBrowserHistory';
import routes from './routes';

const history = createBrowserHistory();

export default () => (
  <Router history={history}>
    <Switch>
      <Route path={routes.home} exact component={Home} />
      <Route path={routes.about} exact component={About} />
    </Switch>
  </Router>
);