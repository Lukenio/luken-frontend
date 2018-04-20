import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// static routes
import Apply from './Apply.jsx';

// auth required routes
import { Signup, Signin, ForgotPassword, ResetPassword, AccountVerification, AfterSignup } from './Auth.jsx';
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
    <Route path="/verification-email-sent" component={AfterSignup} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />
    <Route path="/verify-account" component={AccountVerification} />
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
