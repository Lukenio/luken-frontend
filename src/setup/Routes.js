import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import App from 'containers/App';
import Login from '../containers/Login';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
    </Switch>
  )
}

export default Routes;

