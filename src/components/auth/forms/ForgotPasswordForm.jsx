import React from 'react';
import { Flex } from 'grid-styled';
import { Field, reduxForm } from 'redux-form';

import { FormWrapper, Input, FormErrorAlert } from './Elements.jsx';
import Button from '../../ui/Button.jsx';
import { authResetPassword } from '../../../actions/auth';

const dispatchValues = (values, dispatch) => {
  const { username } = values;
  dispatch(authResetPassword(username));
};

const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Please fill out this field.';
  }

  return errors;
};

const ForgotPasswordForm = ({ statusText, handleSubmit, submitting }) => {
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(dispatchValues)}>
        {statusText && <FormErrorAlert statusText={statusText} />}
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
};

const formConfiguration = {
  form: 'reset-password-form',
  validate
};

export default reduxForm(formConfiguration)(ForgotPasswordForm);
