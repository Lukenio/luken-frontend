import React, { Component } from 'react';
import { Flex } from 'grid-styled';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { FormWrapper, Input, FormErrorAlert } from './Elements.jsx';
import Button from '../../ui/Button.jsx';
import { SERVER_URL } from '../../../utils/config';
import { parseQueryString } from '../../../utils';

const validate = values => {
  const errors = {};

  if (!values.password) {
    errors.password = 'Please fill out this field.';
  }
  if (!values.password_confirm) {
    errors.password_confirm = 'Please fill out this field.';
  }
  if (values.password !== values.password_confirm) {
    errors.password = "Passwords don't match";
  }

  return errors;
};

class ResetPasswordForm extends Component {
  render() {
    const { error, handleSubmit, pristine, submitting } = this.props;

    return (
      <FormWrapper>
        <form onSubmit={handleSubmit(this.processValues)}>
          {error && <FormErrorAlert statusText={error} />}
          <Field
            name="password"
            label="Password"
            type="password"
            component={Input}
          />
          <Field
            name="password_confirm"
            label="Confirm Password"
            type="password"
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

  processValues = ({ password }, dispatch) => {
    const {
      user_id,
      timestamp,
      signature
    } = parseQueryString(document.location.search);

    return fetch(`${SERVER_URL}/api/v1/accounts/reset-password/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id,
        timestamp,
        signature,
        password
      })
    })
      .then(res => {
        if (!res.ok) {
          return res.json();
        }

        dispatch(push('/login'));
      })
      .then(res => {
        const { password, detail, ...other } = res;
        const error = new SubmissionError({
          password: Array.isArray(password) ? password.join(' ') : password,
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
  form: 'reset-password-form',
  validate
};

export default reduxForm(formConfiguration)(ResetPasswordForm);
