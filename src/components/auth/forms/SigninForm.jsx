import React from 'react';
import { Flex } from 'grid-styled';
import { Field, reduxForm } from 'redux-form';

import { FormWrapper, Input, FormErrorAlertHTML } from './Elements.jsx';
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

const SigninForm = ({ statusText, handleSubmit, pristine, submitting }) => {
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(dispatchValues)}>
        {statusText && <FormErrorAlertHTML statusText={statusText} />}
        <Field
          name="username"
          placeholder="Username"
          type="username"
          component={Input}
        />
        <Field
          name="password"
          placeholder="Password"
          type="password"
          component={Input}
        />
        <Flex justify="center">
          <Button type="submit" disabled={pristine || submitting}>
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
