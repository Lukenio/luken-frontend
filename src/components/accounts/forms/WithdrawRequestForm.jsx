import React from 'react';

import { reduxForm, Field, SubmissionError } from 'redux-form';

import { Input, FormWrapper, FormErrorAlert } from '../../ui/FormElements';

import { dataCryptoWithdrawal } from '../../../actions/coin-accounts';
import { hideWithdrawRequestModal } from '../../../actions/modals';

const dispatchValues = (values, dispatch, props) => {
  const { accountId } = props;

  const payload = {
    ...values,
    amount: Number(values.amount)
  };

  return dispatch(dataCryptoWithdrawal(accountId, payload))
    .then(() => {
      dispatch(hideWithdrawRequestModal());
    })
    .catch((e = {}) => {
      const pub_address = e.pub_address && e.pub_address[0];
      const amount = e.amount && e.amount[0];
      const _error = e.errorDetail;

      throw new SubmissionError({
        pub_address,
        amount,
        _error
      });
    });
};

const validate = values => {
  const errors = {};

  if (!values.pub_address) {
    errors.pub_address = 'Please fiil out this field.';
  }
  if (!values.amount) {
    errors.amount = 'Please fiil out this field.';
  }

  return errors;
};

const WithdrawRequestForm = props => {
  const { error, handleSubmit, accountId, cryptoWithdrawal } = props;
  const { statusText } = cryptoWithdrawal[accountId] || {};

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {(error || statusText) && <FormErrorAlert statusText={error || statusText} />}

      <Field name="pub_address" label="Address" type="text" component={Input} />
      <Field name="amount" label="Amount" type="text" component={Input} />
    </FormWrapper>
  );
};

const formConfiguration = {
  form: 'withdraw-request-form',
  validate,
  onSubmit: dispatchValues
};

export default reduxForm(formConfiguration)(WithdrawRequestForm);
