import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import NavBar from './components/NavBar';
import SideBar from './components/SideBar/';

import theme from './theme';
import './styles/main.sass';
import Provider from 'react-redux/es/components/Provider';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';

import createBrowserHistory from 'history/createBrowserHistory';
import { Route, Router, Switch } from 'react-router';
import routes from './routes';

const history = createBrowserHistory();

const renderRoutes = () => routes.map(route => (
  <Route {...route} key={`route ${route.path}`}/>
));

export default () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <>
            <NavBar/>
            <SideBar/>

            <Switch>
              {renderRoutes()}
            </Switch>
          </>
        </Router>
      </PersistGate>
    </Provider>
  </MuiThemeProvider>
);