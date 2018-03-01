import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Flex, Box } from 'grid-styled';

import routes from './routes';

import 'react-tippy/dist/tippy.css';
import './index.css';

const App = ({ history, store }) => (
  <Provider store={store}>
    <ThemeProvider
      theme={{
        breakpoints: [48, 64, 67.5]
      }}
    >
      <Router history={history}>
        <Flex
          flexDirection="column"
          style={{ height: '100%', minHeight: 'calc(100vh)' }}
        >
          {routes}
        </Flex>
      </Router>
    </ThemeProvider>
  </Provider>
);

App.propTypes = {
  store: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired
};

export default App;
