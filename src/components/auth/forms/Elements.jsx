import React, { Fragment } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Box } from 'grid-styled';

import SVGContainer from '../../ui/SVGContainer';
import { SpinnerIcon } from '../../ui/SVGIcons';

const inputStyles = css`
  width: 100%;
  background: #ffffff;
  border: 1px solid #e4e3e4;
  border-radius: 5px;
  color: ${({ mini }) => (mini ? '#5B5B5B' : 'inherit')};
  min-height: ${({ mini }) => (mini ? '23px' : '42px')};
  padding: ${({ mini }) => (mini ? '4px 7px' : '5px')};
  font-size: ${({ mini }) => (mini ? '12px' : '14px')};
  line-height: ${({ mini }) => (mini ? '14px' : 'inherit')};
  margin-bottom: ${({ noSpacer, mini }) =>
    !noSpacer ? (mini ? 0 : '10px') : 0};

  &[type='checkbox'],
  &[type='radio'] {
    display: inline-block;
    min-height: 0;
    background: #069ed8;
    border: 0;
    border-radius: 0;
    width: auto;
    height: auto;
    margin: 0 3px 0 1px;
  }
`;

export const ErrorField = styled.span`
  font-size: 12px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 20px;
  padding: 5px 0;
`;

const formStyles = css`
  background: #fff;
  color: #9b9b9b;
  padding: 25px;
  border-radius: 10px;
  width: ${({ wide }) => (wide ? '100%' : '505px')};
  min-height: 50px;
  font-size: 15px;
`;

export const Form = styled.form`
  ${formStyles};
`;

export const FormWrapper = styled.div`
  ${formStyles};
`;

export const Label = styled.label`
  width: 100%;
  display: inline-block;

  font-size: 14px;
  font-weight: 600;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 22px;
`;

export const Spacer = styled.div`
  margin-bottom: 10px;
`;

export const FormError = styled.span`
  font-size: 14px;
  color: #cd021b;
  margin-bottom: 5px;
`;

export const FormErrorAlert = ({ statusText }) => (
  <Box>
    <FormError>{statusText}</FormError>
    <Rule />
  </Box>
);

const StyledInput = styled.input`
  ${inputStyles};
`;

export const Input = ({
  input,
  meta,
  label,
  placeholder,
  mini,
  disabledText,
  ...other
}) => (
  <Fragment>
    <Label mini={mini}>{label}</Label>
    <StyledInput
      {...input}
      {...other}
      disabled={!!disabledText}
      placeholder={placeholder || label}
      noSpacer={meta.error && meta.touched}
      mini={mini}
    />
    {disabledText && <ErrorField>{disabledText}</ErrorField>}
    {meta.error && meta.touched && <ErrorField>{meta.error}</ErrorField>}
    <Spacer />
  </Fragment>
);

export const Rule = styled(Box)`
  border-top: 1px solid #e8e0e0;
  height: 2px;
  width: 100%;
  margin: ${({ noMargin }) => (noMargin ? 0 : '20px 0')};
`;

const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
  padding: 1rem;
  font-size: 1.2rem;
  opacity: 0.4;
`;

export const LoadingIndicator = () => (
  <Rotate>
    <SVGContainer w={20} h={20}>
      <SpinnerIcon />
    </SVGContainer>
  </Rotate>
);
