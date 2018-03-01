import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Signup, Signin } from './Auth.jsx';
import Home from './Home.jsx';
import AccountDetailsPage from './AccountDetailsPage.jsx';

import requireAuthentication from './utils/requireAuthentication';

export default (
  <Switch>
    <Route path="/login" component={Signin} />
    <Route path="/signup" component={Signup} />
    <Route path="/home" component={requireAuthentication(Home)} />
    <Route
      path="/coin-account/:accountId"
      component={requireAuthentication(AccountDetailsPage)}
    />
    {/*<Route
      path="/notifications"
      component={requireAuthentication(Notifications)}
    /> */}
    {/* <Route path="/inbox" component={requireAuthentication(Inbox)} /> */}
    {/* <Route path="/settings" component={requireAuthentication(Settings)} /> */}
    <Redirect exact from="/" to="/login" />
  </Switch>
);
