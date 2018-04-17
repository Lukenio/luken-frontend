import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinksWrapper = styled.div`
  display: flex;
  justify-content: ${props => (props.centered ? 'center' : 'space-between')};
  padding-top: 30px;
  font-size: 14px;
`;

const BolderLink = styled(Link)`
  font-weight: 500;
  color: #9B9B9B;
`;

const LoginLinks = () => (
  <LinksWrapper>
    <span><BolderLink to="/reset-password">Forgot Password</BolderLink></span>
    <span>Don't have an account? <BolderLink to="/signup">Sign Up</BolderLink></span>
  </LinksWrapper>
);

const ResetLinks = () => (
  <LinksWrapper centered>
    <span><BolderLink to="/login">Go Back to Sign In</BolderLink></span>
  </LinksWrapper>
);

const SignupLinks = () => (
  <LinksWrapper centered>
    <span>Already have an account? <BolderLink to="/login">Sign In</BolderLink></span>
  </LinksWrapper>
);

const AuthFormLinks = () => {
  return (
    <Switch>
      <Route exact path="/login" component={LoginLinks} />
      <Route exact path="/reset-password" component={ResetLinks} />
      <Route exact path="/signup" component={SignupLinks} />
    </Switch>
  );
};

export default AuthFormLinks;
