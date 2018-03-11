import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Box } from 'grid-styled';
import { createNumberMask } from 'redux-form-input-masks';
import { Field } from 'redux-form';

import SVGContainer from '../../ui/SVGContainer';
import { ConvertionIcon as ConvertionIconSVG } from '../../ui/SVGIcons';

export const FormWrapper = styled.form`
  width: 100%;
`;

const Label = styled.label`
  width: 100%;
  display: inline-block;

  font-family: Montserrat;
  font-weight: 600;
  font-size: 14px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 22px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 11px 19px;
  border: 1px solid #9b9b9b;
  border-radius: 100px;
  font-family: Montserrat;
  font-size: 15px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 22px;
  outline: none;

  &::placeholder {
    color: rgba(155, 155, 155, 0.4);
  }
`;

export const ErrorField = styled.span`
  font-family: Montserrat;
  font-size: 12px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 20px;
`;

const InputWrapper = styled(Box)`
  height: 87px;
`;

export const ConvertionIcon = () => (
  <SVGContainer w={18} mx={27}>
    <ConvertionIconSVG />
  </SVGContainer>
);

export const Input = ({ input, meta, label, placeholder }) => (
  <InputWrapper w={1}>
    <Label>{label}</Label>
    <StyledInput {...input} placeholder={placeholder || label} />
    {meta.error && meta.touched && <ErrorField>{meta.error}</ErrorField>}
  </InputWrapper>
);

export const CryptoInput = ({ conversionRate, form, change, prefix }) => {
  const cryptoChange = crypto => {
    change(form, 'loaned_amount', crypto * conversionRate);
  };

  const cryptoMask = createNumberMask({
    prefix,
    decimalPlaces: 5,
    locale: 'en-US',
    onChange: cryptoChange
  });

  return (
    <Field
      name="crypto_collateral"
      label="How Much Collateral are You Posting?"
      type="text"
      component={Input}
      {...cryptoMask}
    />
  );
};

export const USDInput = ({ conversionRate, form, change }) => {
  const usdChange = usd => {
    change(form, 'crypto_collateral', usd / conversionRate);
  };

  const usdMask = createNumberMask({
    prefix: '$ ',
    decimalPlaces: 2,
    locale: 'en-US',
    onChange: usdChange
  });

  return (
    <Field
      name="loaned_amount"
      label="How Much are You Looking to Borrow?"
      type="text"
      component={Input}
      {...usdMask}
    />
  );
};

const StyledRadio = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  opacity: 0;

  &[type='radio']:checked + label::before {
    border-color: #979797;
  }

  &[type='radio']:checked + label::after {
    display: block;
  }
`;

const RadioLabel = styled.label`
  padding-left: 19px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &::before,
  &::after {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  &::before {
    left: 0;
    border: 1px solid rgba(151, 151, 151, 0.5);
    ${'' /* box-shadow: inset 1px 1px rgba(0, 0, 0, 0.03); */} border-radius: 50%;
  }

  &::after {
    left: 3px;
    width: 6px;
    height: 6px;
    background: #9b9b9b;
    border-radius: 50%;
    display: none;
  }
`;

const RadioWrapper = styled(Box)`
  position: relative;
  display: inline-block;
`;

export const RadioInput = ({ label, input }) => {
  const _onChange = () => input.onChange(input.value);

  return (
    <RadioWrapper mr={30}>
      <StyledRadio type="radio" {...input} />
      <RadioLabel for={input.name} onClick={_onChange}>
        {label}
      </RadioLabel>
    </RadioWrapper>
  );
};

export const TermSpan = styled.span`
  font-family: Montserrat;
  font-weight: 600;
  font-size: 14px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 22px;
  margin-right: 28px;
`;

export const Divider = styled(Box)`
  height: 1px;
  background: rgba(155, 155, 155, 0.25);
`;
