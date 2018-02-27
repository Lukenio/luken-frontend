import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import App from 'containers/App';
import ErrorPage from 'containers/errorPage';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/error" component={ErrorPage} />
    </Switch>
  )
}

export default Routes;

