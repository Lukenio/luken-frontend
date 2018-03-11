import React from 'react';
import { connect } from 'react-redux';
import { Flex, Box } from 'grid-styled';
import { Field, reduxForm, change, getFormSyncErrors } from 'redux-form';

import {
  Input,
  FormWrapper,
  ErrorField,
  ConvertionIcon,
  USDInput,
  TermSpan,
  CryptoInput,
  RadioInput,
  Divider
  // FormErrorAlert
} from './Elements.jsx';
import { BlueButton } from '../../ui/Button.jsx';
import { applyNewLoan } from '../../../actions/apply';

const BTC_FORM = 'apply-form-btc';
const ETH_FORM = 'apply-form-eth';

const dispatchValues = cryptoType => (values, dispatch) => {
  const { email, crypto_collateral, loaned_amount, terms_month } = values;
  debugger;
  dispatch(
    applyNewLoan({
      email,
      crypto_collateral,
      loaned_amount,
      terms_month,
      crypto_type: cryptoType
    })
  );
};

const validate = values => {
  const errors = {};

  if (!values.loaned_amount) {
    errors.loaned_amount =
      "Please let us know how much you're looking to borrow.";
  }
  if (!values.terms_month) {
    errors.terms_month = "Please pick the period you're looking to borrow.";
  }
  if (!values.email) {
    errors.email = 'Please enter an email address.';
  }

  return errors;
};

const ApplyForm = ({
  form,
  syncErrors = {},
  submitFailed,
  change,
  prefix,
  cryptoType,
  handleSubmit,
  submitting,
  conversionRate,
  ...other
}) => {
  return (
    <Flex p={59} w={1}>
      <FormWrapper onSubmit={handleSubmit(dispatchValues(cryptoType))}>
        {/* {statusText && <FormErrorAlert statusText={statusText} />} */}
        <Flex w={1}>
          <Box w={340}>
            <USDInput
              change={change}
              form={form}
              conversionRate={conversionRate}
            />
          </Box>
          <ConvertionIcon />
          <Box w={340}>
            <CryptoInput
              change={change}
              form={form}
              conversionRate={conversionRate}
              prefix={prefix}
            />
          </Box>
        </Flex>
        <Flex width={1}>
          <TermSpan>Term:</TermSpan>
          <Field
            type="radio"
            name="terms_month"
            label="3 months"
            value="0"
            component={RadioInput}
          />
          <Field
            type="radio"
            name="terms_month"
            label="6 months"
            value="1"
            component={RadioInput}
          />
          <Field
            type="radio"
            name="terms_month"
            label="12 months"
            value="2"
            component={RadioInput}
          />
        </Flex>
        {submitFailed &&
          syncErrors.terms_month && (
            <ErrorField>{syncErrors.terms_month}</ErrorField>
          )}
        <Divider width={1} mt={26} />
        <Flex w={1} mt={27}>
          <Field
            name="email"
            label="Enter Your Email Address"
            type="text"
            placeholder="Email Address"
            component={Input}
          />
        </Flex>

        <Flex justify="center" pt={54}>
          <BlueButton type="submit" disabled={submitting}>
            Get Started
          </BlueButton>
        </Flex>
      </FormWrapper>
    </Flex>
  );
};

const mapDispatchToProps = dispatch => ({
  change: (form, field, value) => dispatch(change(form, field, value))
});

const BTCApplyFormConnected = connect(
  state => ({
    syncErrors: getFormSyncErrors(BTC_FORM)(state)
  }),
  mapDispatchToProps
)(ApplyForm);

const ETHApplyFormConnected = connect(
  state => ({
    syncErrors: getFormSyncErrors(ETH_FORM)(state)
  }),
  mapDispatchToProps
)(ApplyForm);

export const BTCApplyForm = reduxForm({
  form: BTC_FORM,
  prefix: 'BTC ',
  cryptoType: 0,
  validate
})(BTCApplyFormConnected);

export const ETHApplyForm = reduxForm({
  form: ETH_FORM,
  prefix: 'ETH ',
  cryptoType: 1,
  validate
})(ETHApplyFormConnected);
