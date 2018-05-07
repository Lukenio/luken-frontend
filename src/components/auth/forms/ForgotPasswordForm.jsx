import React, { Component } from 'react';
import { Flex } from 'grid-styled';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import fetch from 'isomorphic-fetch';

import { FormWrapper, Input, FormErrorAlert } from './Elements.jsx';
import Button from '../../ui/Button.jsx';
import { SERVER_URL } from '../../../utils/config';

const validate = values => {
  const errors = {};

  if (!values.login) {
    errors.login = 'Please fill out this field.';
  }

  return errors;
};

class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = { didSend: false };
  }

  render() {
    const { error, handleSubmit, pristine, submitting } = this.props;
    const { didSend } = this.state;

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
          {error && <FormErrorAlert statusText={error} />}
          <Field
            name="login"
            label="Username"
            type="text"
            component={Input}
          />
          <Flex justify="center">
            <Button type="submit" disabled={pristine || submitting}>
              Send
            </Button>
          </Flex>
        </form>
      </FormWrapper>
    );
  }

  processValues = ({ login }) => {
    return fetch(`${SERVER_URL}/api/v1/accounts/send-reset-password-link/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login
      })
    })
      .then(res => {
        if (!res.ok) {
          return res.json();
        }

        this.setState({ didSend: true });
      })
      .then(res => {
        const { login, detail, ...other } = res;
        const error =  new SubmissionError({
          login: Array.isArray(login) ? login.join(' ') : login,
          _error: (
            (Array.isArray(detail) ? detail.join(' ') : detail)
            || (Object.keys(other).length > 0 ? 'There were problems.' : '')
          )
        });
        error.isFormError = true;
        throw error;
      })
      .catch(error => {
        if (error.isFormError) {
          throw error;
        }

        throw new SubmissionError({ _error: error.message });
      });
  }
}

const formConfiguration = {
  form: 'forgot-password-form',
  validate
};

export default reduxForm(formConfiguration)(ForgotPasswordForm);
