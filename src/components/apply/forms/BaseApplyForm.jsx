import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import {
  Field,
  change,
  getFormSyncErrors,
  formValueSelector
} from 'redux-form';

import {
  Input,
  CurrencyInput,
  FormWrapper,
  ErrorField,
  ConvertionIcon,
  TermSpan,
  RadioInput,
  Divider
  // FormErrorAlert
} from './Elements.jsx';
import { BlueButton } from '../../ui/Button.jsx';
import { applyNewLoan } from '../../../actions/apply';
import {
  convertFromUSDToCrypto,
  convertFromCryptoToUSD
} from '../../../utils/currencyConverters';

const getTermMonthsByType = type => {
  if (typeof type === 'undefined') return null;

  const termsMontsMap = {
    0: 3,
    1: 6,
    2: 12
  };
  return termsMontsMap[Number(type)];
};

const dispatchValues = cryptoType => (values, dispatch) => {
  const { email, crypto_collateral, loaned_amount, terms_month } = values;
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

class BaseApplyForm extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.termsMonth !== this.props.termsMonth) {
      const cryptosToCollate = this.calculateCryptoCollateral(
        this.props.loanedAmount,
        newProps.termsMonth
      );

      this.setFormValue('crypto_collateral', cryptosToCollate);
    }
  }

  setFormValue = (key, value) => {
    const { change, form } = this.props;

    if (!isNaN(value)) {
      change(form, key, value);
    }
  };

  calculateLoanedAmmount = (c, termsMonth) => {
    const { cryptoPrice } = this.props;
    const te = getTermMonthsByType(termsMonth);
    return convertFromCryptoToUSD(c, cryptoPrice, te);
  };

  calculateCryptoCollateral = (ta, termsMonth) => {
    const { cryptoPrice } = this.props;
    const te = getTermMonthsByType(termsMonth);
    return convertFromUSDToCrypto(ta, cryptoPrice, te);
  };

  handleUSDInputChange = ta => {
    if (!ta) {
      this.setFormValue('crypto_collateral', '');
      return;
    }

    const cryptosToCollate = this.calculateCryptoCollateral(
      ta,
      this.props.termsMonth
    );
    this.setFormValue('crypto_collateral', cryptosToCollate);
  };

  handleCryptoInputChange = c => {
    if (!c) {
      this.setFormValue('loaned_amount', '');
      return;
    }
    const totalAmount = this.calculateLoanedAmmount(c, this.props.termsMonth);
    this.setFormValue('loaned_amount', totalAmount);
  };

  render() {
    const {
      syncErrors = {},
      submitFailed,
      prefix,
      cryptoType,
      handleSubmit,
      submitting,
      isCryptoPriceFetching
    } = this.props;

    return (
      <Flex p={59} w={1}>
        <FormWrapper onSubmit={handleSubmit(dispatchValues(cryptoType))}>
          {/* {statusText && <FormErrorAlert statusText={statusText} />} */}
          <Flex w={1}>
            <Box w={340}>
              <Field
                name="loaned_amount"
                label="How Much are You Looking to Borrow?"
                type="text"
                component={CurrencyInput}
                disabled={isCryptoPriceFetching}
                handleChange={this.handleUSDInputChange}
              />
            </Box>
            <ConvertionIcon />
            <Box w={340}>
              <Field
                name="crypto_collateral"
                label="How Much Collateral are You Posting?"
                type="text"
                component={CurrencyInput}
                disabled={isCryptoPriceFetching}
                prefix={prefix}
                decimalScale={8}
                handleChange={this.handleCryptoInputChange}
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
  }
}

export const formOptionsBuilder = (form, prefix, cryptoType) => ({
  form,
  prefix,
  cryptoType,
  initialValues: {
    terms_month: '0'
  },
  validate
});

export const mapDispatchToProps = dispatch => ({
  change: (form, field, value) => dispatch(change(form, field, value))
});

export const mapStateToPropsBuilder = (
  form,
  priceSelector = () => {}
) => state => {
  const valuesSelector = formValueSelector(form);

  return {
    syncErrors: getFormSyncErrors(form)(state),
    termsMonth: valuesSelector(state, 'terms_month'),
    loanedAmount: valuesSelector(state, 'loaned_amount'),
    isCryptoPriceFetching: state.coinsPrice.isFetching,
    cryptoPrice: priceSelector(state)
  };
};

export default BaseApplyForm;