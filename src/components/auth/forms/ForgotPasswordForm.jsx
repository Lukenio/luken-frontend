import React, { Component } from 'react';
import { Flex } from 'grid-styled';
import { Field, reduxForm } from 'redux-form';
import fetch from 'isomorphic-fetch';

import { FormWrapper, Input, FormErrorAlert } from './Elements.jsx';
import Button from '../../ui/Button.jsx';
import { SERVER_URL } from '../../../utils/config';
import { checkHttpStatus, parseJSON } from '../../../utils';

const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Please fill out this field.';
  }

  return errors;
};

class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = { didSend: false, ownStatusText: null };
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const { didSend, ownStatusText } = this.state;

    if (didSend) {
      return (
        <FormWrapper>
          <p>Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.</p>
        </FormWrapper>
      );
    }

    return (
      <FormWrapper>
        <form onSubmit={handleSubmit(this.processValues)}>
          {ownStatusText && <FormErrorAlert statusText={ownStatusText} />}
          <Field
            name="username"
            label="Username"
            type="username"
            component={Input}
          />
          <Flex justify="center">
            <Button type="submit" disabled={submitting}>
              Send
            </Button>
          </Flex>
        </form>
      </FormWrapper>
    );
  }

  processValues = ({ username }) => {
    fetch(`${SERVER_URL}/api/v1/accounts/send-reset-password-link/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: username
      })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(() => {
        this.setState({ didSend: true });
      })
      .catch(error => {
        this.setState({ ownStatusText: error.message });
      });
  }
}

const formConfiguration = {
  form: 'forgot-password-form',
  validate
};

export default reduxForm(formConfiguration)(ForgotPasswordForm);
