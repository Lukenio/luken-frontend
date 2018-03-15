import React from 'react';
import styled, { css } from 'styled-components';
import { Box } from 'grid-styled';

import SVGContainer from '../../ui/SVGContainer';
import { ConvertionIcon as ConvertionIconSVG } from '../../ui/SVGIcons';
import NumberFormat from 'react-number-format';

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

const inputStyles = css`
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

const StyledInput = styled.input`
  ${inputStyles};
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
  handleChange
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
      />
      {meta.error && meta.touched && <ErrorField>{meta.error}</ErrorField>}
    </InputWrapper>
  );
};

export const Input = ({ input, meta, label, placeholder }) => (
  <InputWrapper w={1}>
    <Label>{label}</Label>
    <StyledInput {...input} placeholder={placeholder || label} />
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
