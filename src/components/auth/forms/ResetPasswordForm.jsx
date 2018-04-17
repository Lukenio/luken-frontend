import React, { Component } from 'react';
import { Flex } from 'grid-styled';
import { Field, reduxForm } from 'redux-form';

import { FormWrapper, Input, FormErrorAlert } from './Elements.jsx';
import Button from '../../ui/Button.jsx';

const validate = values => {
  const errors = {};

  if (!values.password1) {
    errors.password1 = 'Required';
  }
  if (!values.password2) {
    errors.password2 = 'Required';
  }
  if (values.password1 !== values.password2) {
    errors.password1 = "Passwords don't match";
  }

  return errors;
};

class ResetPasswordForm extends Component {
  render() {
    const { statusText, handleSubmit, submitting } = this.props;
    return (
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          {statusText && <FormErrorAlert statusText={statusText} />}
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
}

const formConfiguration = {
  form: 'reset-password-form',
  validate
};

export default reduxForm(formConfiguration)(ResetPasswordForm);
