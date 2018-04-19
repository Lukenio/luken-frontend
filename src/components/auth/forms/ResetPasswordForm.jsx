import React, { Component } from 'react';
import { Flex } from 'grid-styled';
import { Field, reduxForm } from 'redux-form';
import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { FormWrapper, Input, FormErrorAlert } from './Elements.jsx';
import Button from '../../ui/Button.jsx';
import { SERVER_URL } from '../../../utils/config';
import { checkHttpStatus, parseJSON, parseQueryString } from '../../../utils';

const validate = values => {
  const errors = {};

  if (!values.password1) {
    errors.password1 = 'Please fill out this field.';
  }
  if (!values.password2) {
    errors.password2 = 'Please fill out this field.';
  }
  if (values.password1 !== values.password2) {
    errors.password1 = "Passwords don't match";
  }

  return errors;
};

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ownStatusText: null };
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const { ownStatusText } = this.state;

    return (
      <FormWrapper>
        <form onSubmit={handleSubmit(this.processValues)}>
          {ownStatusText && <FormErrorAlert statusText={ownStatusText} />}
          <Field
            name="password1"
            label="Password"
            type="password"
            component={Input}
          />
          <Field
            name="password2"
            label="Confirm Password"
            type="password"
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

  processValues = ({ password1 }, dispatch) => {
    const {
      user_id,
      timestamp,
      signature
    } = parseQueryString(document.location.search);

    fetch(`${SERVER_URL}/api/v1/accounts/reset-password/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id,
        timestamp,
        signature,
        password: password1
      })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(() => {
        dispatch(push('/login'));
      })
      .catch(error => {
        this.setState({ ownStatusText: error.message });
      });
  }
}

const formConfiguration = {
  form: 'reset-password-form',
  validate
};

export default reduxForm(formConfiguration)(ResetPasswordForm);
