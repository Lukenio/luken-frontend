import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// static routes
import Apply from './Apply.jsx';

// auth required routes
import { Signup, Signin, ResetPassword } from './Auth.jsx';
// import Home from './Home.jsx';
import NotFound from './NotFound.jsx';
import AccountDetailsPage from './AccountDetailsPage.jsx';
import KYCPage from './KYCPage.jsx';

// middlewares
import requireAuthentication from './utils/requireAuthentication';

export default (
  <Switch>
    <Route path="/apply" component={Apply} />
    <Route path="/login" component={Signin} />
    <Route path="/signup" component={Signup} />
    <Route path="/reset-password" component={ResetPassword} />
    <Route
      exact
      path="/a/:accountSymbol"
      component={requireAuthentication(AccountDetailsPage)}
    />
    <Route exact path="/kyc" component={requireAuthentication(KYCPage)} />
    <Redirect exact from="/home" to="/a/btc" />
    <Redirect exact from="/" to="/a/btc" />
    <Redirect exact from="/a" to="/" />
    <Route path="*" component={NotFound} />
  </Switch>
);
