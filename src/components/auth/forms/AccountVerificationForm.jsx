import React, { Component } from 'react';
import { Flex } from 'grid-styled';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { FormWrapper, FormErrorAlert, LoadingIndicator } from './Elements.jsx';
import Button from '../../ui/Button.jsx';
import { SERVER_URL } from '../../../utils/config';
import { checkHttpStatus, parseJSON, parseQueryString } from '../../../utils';

class AccountVerificationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { didSend: false, ownStatusText: null };
  }

  componentDidMount() {
    this.processValues();
  }

  componentWillUnmount() {
    clearTimeout(this.redirectTimeout);
  }

  render() {
    const { didSend, ownStatusText } = this.state;

    return (
      <FormWrapper>
        {ownStatusText && <FormErrorAlert statusText={ownStatusText} />}
        <Flex justify="center">
          {!didSend && !ownStatusText &&
            <LoadingIndicator />
          }
          {didSend && !ownStatusText &&
            <p>User verified successfully</p>
          }
          {didSend && ownStatusText &&
            <Button onClick={this.handleClick}>Retry</Button>
          }
        </Flex>
      </FormWrapper>
    );
  }

  handleClick = () => {
    this.setState({ didSend: false, ownStatusText: null }, this.processValues);
  }

  processValues() {
    const { loginRedirect } = this.props;

    const {
      user_id,
      timestamp,
      signature
    } = parseQueryString(document.location.search);

    fetch(`${SERVER_URL}/api/v1/accounts/verify-registration/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id,
        timestamp,
        signature
      })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(() => {
        this.setState({ didSend: true });
        this.redirectTimeout = setTimeout(loginRedirect, 2000);
      })
      .catch(error => {
        this.setState({ didSend: true, ownStatusText: error.message });
      });
  }
}

const mapDispatchToProps = dispatch => ({
  loginRedirect: () => dispatch(push('/login'))
});

export default connect(null, mapDispatchToProps)(AccountVerificationForm);
