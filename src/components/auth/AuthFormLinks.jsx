import React from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinksWrapper = styled.div`
  display: flex;
  justify-content: ${props => (props.centered ? 'center' : 'space-between')};
  padding: 30px 0;
  font-size: 14px;
`;

const BolderLink = styled(Link)`
  font-weight: 500;
  color: #9B9B9B;
`;

const LoginLinks = () => (
  <LinksWrapper>
    <span><BolderLink to="/forgot-password">Forgot Password</BolderLink></span>
    <span>Don't have an account? <BolderLink to="/signup">Sign Up</BolderLink></span>
  </LinksWrapper>
);

const ForgotPasswordLinks = () => (
  <LinksWrapper centered>
    <span><BolderLink to="/login">Go Back to Sign In</BolderLink></span>
  </LinksWrapper>
);

const SignupLinks = () => (
  <LinksWrapper centered>
    <span>Already have an account? <BolderLink to="/login">Sign In</BolderLink></span>
  </LinksWrapper>
);

const AfterSignupLinks = () => (
  <LinksWrapper centered>
    <span>Email didn’t arrive? <BolderLink to="#">Resend a verification email</BolderLink></span>
  </LinksWrapper>
);

const AuthFormLinks = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginLinks} />
      <Route exact path="/forgot-password" component={ForgotPasswordLinks} />
      <Route exact path="/reset-password" component={ForgotPasswordLinks} />
      <Route exact path="/signup" component={SignupLinks} />
      <Route exact path="/verification-email-sent" component={AfterSignupLinks} />
    </Switch>
  );
};

export default AuthFormLinks;
