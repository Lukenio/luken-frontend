import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Box } from 'grid-styled';

import SVGContainer from '../../ui/SVGContainer';
import { ConvertionIcon as ConvertionIconSVG } from '../../ui/SVGIcons';
import NumberFormat from 'react-number-format';

export const FormWrapper = styled.form`
  width: 100%;
`;

export const FormError = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #cd021b;
`;

export const FormErrorAlert = ({ statusText }) => (
  <Box mb={20} style={{ textAlign: 'center' }}>
    <FormError>{statusText}</FormError>
  </Box>
);

const Label = styled.label`
  width: 100%;
  display: inline-block;
  font-weight: 800;
  line-height: 1.5;
  letter-spacing: 0.2px;
  color: #224e88;
  text-align: left;
  margin-bottom: 5px;
`;

const LabelCentered = Label.extend`
  text-align: center;
`;

const inputStyles = css`
  width: 100%;
  /* height: 44px; */
  /* padding: 11px 19px; */
  font-family: Montserrat;
  letter-spacing: 0;
  line-height: 22px;
  outline: none;
  padding-bottom: 6px;
  padding-top: 6px;
  background: 0 0;
  box-shadow: inset 0 0 0 transparent;
  font-size: 15px;
  line-height: 1.31;
  text-align: left;
  color: #9b9b9b;
  border: 0;
  border-bottom: solid 2px #3195ec;
  padding-left: 0;
  padding-right: 5px;
  font-weight: 200;

  &::placeholder {
    color: rgba(155, 155, 155, 0.4);
  }
`;

const StyledInput = styled.input`
  ${inputStyles};
`;

export const ErrorField = styled.span`
  font-family: Montserrat;
  font-size: 12px;
  color: #f25f55;
  letter-spacing: 0;
  line-height: 20px;
  display: inline-block;
`;

const InputWrapper = styled(Box)`
  min-height: 87px;
`;

export const ConvertionIcon = () => (
  <SVGContainer w={18} mx={27}>
    <ConvertionIconSVG />
  </SVGContainer>
);

const StyledNumberFormat = styled(NumberFormat)`
  ${inputStyles};
`;

export const CurrencyInput = ({
  input,
  meta,
  label,
  placeholder,
  prefix = '$ ',
  decimalScale = 2,
  handleChange,
  ...other
}) => {
  const onChange = ({ formattedValue, value }) => {
    const parsedValue = parseFloat(value) || '';

    input.onChange(parsedValue);

    if (typeof handleChange === 'function') {
      handleChange(parsedValue);
    }
  };

  return (
    <InputWrapper w={1}>
      <Label>{label}</Label>
      <StyledNumberFormat
        value={input.value}
        placeholder={placeholder || label}
        thousandSeparator={true}
        decimalScale={decimalScale}
        prefix={prefix}
        allowNegative={false}
        onValueChange={onChange}
        {...other}
      />
      {meta.error && meta.touched && <ErrorField>{meta.error}</ErrorField>}
    </InputWrapper>
  );
};

export const Input = ({ input, meta, label, placeholder, ...other }) => (
  <InputWrapper w={1}>
    <LabelCentered>{label}</LabelCentered>
    <StyledInput {...input} placeholder={placeholder || label} {...other} />
    {meta.error && meta.touched && <ErrorField>{meta.error}</ErrorField>}
  </InputWrapper>
);

const StyledRadio = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  height: 55px;
  width: 55px;

  &[type='radio']:checked + label::before {
    border-color: #224e88;
    background-color: #224e88;
    color: #224e88;
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

const CheckboxLabel = styled.label`
  display: inline-block;
  padding-left: 5px;
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

export const CheckboxInput = ({ label, input, meta }) => {
  const _onChange = () => input.onChange(!input.value);

  return (
    <Box mr={30}>
      <Box>
        <input type="checkbox" {...input} checked={input.value} />
        <CheckboxLabel for={input.name} onClick={_onChange}>
          {label}
        </CheckboxLabel>
      </Box>

      {meta.error && meta.touched && <ErrorField>{meta.error}</ErrorField>}
    </Box>
  );
};

export const TermSpan = styled.span`
  width: 100%;
  display: inline-block;
  font-weight: 800;
  line-height: 1.5;
  letter-spacing: 0.2px;
  color: #224e88;
  text-align: center;
  margin-bottom: 11px;
`;

export const Divider = styled(Box)`
  margin-top: 10px;
  height: 2px;
  background: #3195ec;
  margin-left: 5px;
  margin-right: 5px;
`;

export const DisclaimerTotalLoanAmount = styled.p`
  font-size: 12px;
  font-weight: 400;
`;

export const TLAText = styled.span`
  font-size: 24px;
  display: inline-block;
  color: #2893ef;
  margin-right: 15px;
`;

const TLAWrapper = styled(NumberFormat)`
  font-size: 34px;
  font-weight: 800;
  display: inline-block;
  color: #2893ef;
`;

const TLATextWrapper = styled.div`
  min-height: 44px;
`;

export const TLAComponent = ({
  input,
  meta,
  prefix = '$ ',
  decimalScale = 2
}) => (
  <Fragment>
    <TLATextWrapper>
      <TLAText>Total Loan Amount:</TLAText>
      <TLAWrapper
        value={input.value || 0}
        thousandSeparator={true}
        decimalScale={decimalScale}
        prefix={prefix}
        suffix={' *'}
        allowNegative={false}
        displayType="text"
      />
    </TLATextWrapper>
    {meta.error && meta.touched && <ErrorField>{meta.error}</ErrorField>}
  </Fragment>
);

export const ExplanationList = styled.ul`
  display: block;
  margin: 0;
  padding: 0;
  list-style: none;
  color: #B9B9B9;

  @media (min-width: 640px) {
    display: flex;
  }
`;

export const ExplanationItem = styled.li`
  padding: 0 0.7em;

  @media (min-width: 640px) {
    padding: 0 1.1em;
    border-left: solid 1px #B9B9B9;

    &:first-child {
      border: none;
    }
  }
`;
