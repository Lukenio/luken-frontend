import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Flex } from 'grid-styled';

import routes from './routes';

import 'react-tippy/dist/tippy.css';
import './index.css';

const App = ({ history, store }) => (
  <Provider store={store}>
    <ThemeProvider
      theme={{
        breakpoints: ['768px', '1024px', '1080px']
      }}
    >
      <Router history={history}>
        <Flex flexDirection="column">{routes}</Flex>
      </Router>
    </ThemeProvider>
  </Provider>
);

App.propTypes = {
  store: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired
};

export default App;
