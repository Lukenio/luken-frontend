import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import App from 'containers/App';
import LoginPage from 'containers/LoginPage';
import SignupPage from 'containers/SignupPage';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
    </Switch>
  )
}

export default Routes;

