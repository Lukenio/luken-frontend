import React from 'react';
import { Flex } from 'grid-styled';
import { Field, reduxForm } from 'redux-form';

import { FormWrapper, Input, FormErrorAlert } from './Elements.jsx';
import Button from '../../ui/Button.jsx';
import { authRegisterUser } from '../../../actions/auth';

const dispatchValues = (values, dispatch) => {
  dispatch(authRegisterUser(values));
};

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password1) {
    errors.password1 = 'Required';
  }
  if (!values.password2) {
    errors.password2 = 'Required';
  }
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (values.password1 !== values.password2) {
    errors.password1 = "Passwords don't match";
  }

  return errors;
};

const SignupForm = ({ handleSubmit, submitting, statusText }) => {
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(dispatchValues)}>
        {statusText && <FormErrorAlert statusText={statusText} />}
        <Field name="firstName" label="First Name" component={Input} />
        <Field name="lastName" label="Last Name" component={Input} />
        <Field name="email" label="Email" type="email" component={Input} />
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
        <Button type="submit" disabled={submitting}>
          Sign Up
        </Button>
      </form>
    </FormWrapper>
  );
};

const formConfiguration = {
  form: 'signup-form',
  validate
};

export default reduxForm(formConfiguration)(SignupForm);
