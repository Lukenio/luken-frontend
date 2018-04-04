import React from 'react';
import styled, { css } from 'styled-components';
import { Box } from 'grid-styled';

export const FormWrapper = styled.form`
  width: 100%;
`;

const FormError = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #cd021b;
`;

export const FormErrorAlert = ({ statusText }) => (
  <Box mb={20} style={{ textAlign: 'center' }}>
    <FormError>{statusText}</FormError>
  </Box>
);

export const Label = styled.label`
  width: 100%;
  display: inline-block;

  font-family: Montserrat;
  font-weight: 600;
  font-size: 14px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 22px;
`;

export const inputStyles = css`
  width: 100%;
  height: 44px;
  padding: 11px 19px;
  border: 1px solid #9b9b9b;
  border-radius: ${props => (props.rounded ? '100px' : '5px')};
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
  display: inline-block;
`;

export const InputWrapper = styled(Box)`
  min-height: 87px;
`;

export const Input = ({ input, meta, label, placeholder, ...other }) => (
  <InputWrapper w={1}>
    <Label>{label}</Label>
    <StyledInput {...input} placeholder={placeholder || label} {...other} />
    {meta.error && meta.touched && <ErrorField>{meta.error}</ErrorField>}
  </InputWrapper>
);
