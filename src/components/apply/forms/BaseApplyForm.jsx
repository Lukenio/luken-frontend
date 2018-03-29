import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import {
  Field,
  getFormSyncErrors,
  formValueSelector,
  SubmissionError
} from 'redux-form';

import {
  Input,
  CurrencyInput,
  FormWrapper,
  ErrorField,
  ConvertionIcon,
  TermSpan,
  RadioInput,
  Divider,
  DisclaimerTotalLoanAmount,
  TLAComponent,
  FormErrorAlert
} from './Elements.jsx';
import { BlueButton } from '../../ui/Button.jsx';
import { applyNewLoan } from '../../../actions/apply';
import { setGlobalLoanedAmmountValue } from '../../../actions/input';
import {
  convertFromUSDToCrypto,
  convertFromCryptoToUSD,
  getTE,
  getAPR,
  calculateTLA,
  LTV
} from '../../../utils/currencyConverters';

const dispatchValues = cryptoType => (values, dispatch) => {
  const {
    email,
    crypto_collateral,
    loaned_amount,
    terms_month,
    total_loaned_amount
  } = values;

  const apr = getAPR(terms_month);

  const payload = {
    email,
    crypto_collateral,
    total_loaned_amount,
    loaned_amount,
    terms_month,
    apr,
    crypto_type: cryptoType,
    ltv: LTV
  };

  return dispatch(applyNewLoan(payload)).catch((e = {}) => {
    throw new SubmissionError({
      loaned_amount: e.loaned_amount[0].replace('this value', '`Loan Amount`'),
      _error: e.loaned_amount[0].replace('this value', '`Loan Amount`')
    });
  });
};

const validate = values => {
  const errors = {};

  console.log('total_loaned_amount', values.total_loaned_amount);

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
  if (!values.total_loaned_amount || values.total_loaned_amount === '0') {
    errors.total_loaned_amount =
      "Please let us know how much you're looking to borrow.";
  }

  return errors;
};

class BaseApplyForm extends Component {
  componentWillMount() {
    const { initialValues } = this.props;

    if (initialValues.loaned_amount) {
      this.setFormValue(
        'crypto_collateral',
        this.calculateCryptoCollateral(
          initialValues.loaned_amount,
          initialValues.terms_month
        )
      );
      this.setFormValue(
        'total_loaned_amount',
        this.calculateTLA(
          initialValues.loaned_amount,
          initialValues.terms_month
        )
      );
    }
  }

  componentWillReceiveProps({ termsMonth }) {
    if (termsMonth !== this.props.termsMonth) {
      const { loanedAmount } = this.props;

      if (loanedAmount) {
        this.setFormValue(
          'crypto_collateral',
          this.calculateCryptoCollateral(loanedAmount, termsMonth)
        );

        this.setFormValue(
          'total_loaned_amount',
          this.calculateTLA(loanedAmount, termsMonth)
        );
      }
    }
  }

  setFormValue = (key, value) => {
    const { change } = this.props;

    if (!isNaN(value)) {
      change(key, value);
    }
  };

  calculateLoanedAmmount = (C, termsMonth) => {
    const { cryptoPrice } = this.props;
    const TE = getTE(termsMonth);
    const APR = getAPR(termsMonth);
    return convertFromCryptoToUSD({ C, P: cryptoPrice, TE, APR });
  };

  calculateCryptoCollateral = (TA, termsMonth) => {
    const { cryptoPrice } = this.props;
    const TE = getTE(termsMonth);
    const APR = getAPR(termsMonth);
    return convertFromUSDToCrypto({ TA, P: cryptoPrice, TE, APR });
  };

  calculateTLA = (TA, termsMonth) => {
    const TE = getTE(termsMonth);
    const APR = getAPR(termsMonth);
    return calculateTLA({ TA, APR, TE });
  };

  handleUSDInputChange = TA => {
    const { setGlobalLoanedAmmountValue, termsMonth } = this.props;

    if (!TA) {
      this.setFormValue('crypto_collateral', '');
      this.setFormValue('total_loaned_amount', '');
      return;
    }

    this.setFormValue(
      'crypto_collateral',
      this.calculateCryptoCollateral(TA, termsMonth)
    );
    this.setFormValue('total_loaned_amount', this.calculateTLA(TA, termsMonth));

    setGlobalLoanedAmmountValue(TA);
  };

  handleCryptoInputChange = c => {
    const { setGlobalLoanedAmmountValue, termsMonth } = this.props;

    if (!c) {
      this.setFormValue('loaned_amount', '');
      this.setFormValue('total_loaned_amount', '');
      setGlobalLoanedAmmountValue('');
      return;
    }

    const TA = this.calculateLoanedAmmount(c, termsMonth);
    this.setFormValue('loaned_amount', TA);
    this.setFormValue('total_loaned_amount', this.calculateTLA(TA, termsMonth));
    setGlobalLoanedAmmountValue(TA);
  };

  render() {
    const {
      syncErrors = {},
      error,
      submitFailed,
      prefix,
      cryptoType,
      handleSubmit,
      submitting,
      isCryptoPriceFetching
    } = this.props;

    return (
      <Flex px={[20, 59]} py={[20, 59]} w={1}>
        <FormWrapper onSubmit={handleSubmit(dispatchValues(cryptoType))}>
          {error && <FormErrorAlert statusText={error} />}
          <Flex w={1} flexDirection={['column', 'row']}>
            <Box w={[1, 340]} my={[30, 0]}>
              <Field
                name="loaned_amount"
                label="How Much are You Looking to Borrow?"
                placeholder="Please enter your desired loan amount"
                type="text"
                component={CurrencyInput}
                disabled={isCryptoPriceFetching}
                handleChange={this.handleUSDInputChange}
              />
            </Box>
            <ConvertionIcon w={[1, '20px']} />
            <Box w={[1, 340]} mb={[10, 0]}>
              <Field
                name="crypto_collateral"
                label="How Much Collateral are You Posting?"
                type="text"
                placeholder="Please enter your collateral amount"
                component={CurrencyInput}
                disabled={isCryptoPriceFetching}
                prefix={prefix}
                decimalScale={8}
                handleChange={this.handleCryptoInputChange}
              />
            </Box>
          </Flex>
          <Flex width={1} my={[0, 20]} flexDirection={['column', 'row']}>
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

          <Flex
            w={1}
            mt={27}
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Field name="total_loaned_amount" component={TLAComponent} />
          </Flex>

          <Flex w={1} mt={27}>
            <Field
              name="email"
              label="Enter Your Email Address"
              type="email"
              placeholder="Email Address"
              component={Input}
            />
          </Flex>

          <Flex justify="center" pt={[20, 54]}>
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
  validate
});

export const mapDispatchToProps = {
  setGlobalLoanedAmmountValue
};

export const mapStateToPropsBuilder = (form, priceSelector = () => {}) => (
  state,
  ownProps
) => {
  const valuesSelector = formValueSelector(form);

  return {
    syncErrors: getFormSyncErrors(form)(state),
    termsMonth: valuesSelector(state, 'terms_month'),
    loanedAmount: valuesSelector(state, 'loaned_amount'),
    isCryptoPriceFetching: state.coinsPrice.isFetching,
    cryptoPrice: priceSelector(state),
    initialValues: {
      terms_month: '0',
      total_loaned_amount: '0',
      loaned_amount: state.input.globalLoanedAmountValue
    }
  };
};

export default BaseApplyForm;
