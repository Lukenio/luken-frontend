import React from 'react';
import { Flex } from 'grid-styled';
import { Field, reduxForm } from 'redux-form';

import { FormWrapper, Input, FormErrorAlert } from './Elements.jsx';
import Button from '../../ui/Button.jsx';
import { authLoginUser } from '../../../actions/auth';

const dispatchValues = (values, dispatch) => {
  const { username, password } = values;
  dispatch(authLoginUser(username, password));
};

const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Please fill out this field.';
  }
  if (!values.password) {
    errors.password = 'Please fill out this field.';
  }

  return errors;
};

const SigninForm = ({ statusText, handleSubmit, submitting }) => {
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
        <Field
          name="password"
          label="Password"
          type="password"
          component={Input}
        />
        <Flex justify="center">
          <Button type="submit" disabled={submitting}>
            Sign In
          </Button>
        </Flex>
      </form>
    </FormWrapper>
  );
};

const formConfiguration = {
  form: 'signin-form',
  validate
};

export default reduxForm(formConfiguration)(SigninForm);
