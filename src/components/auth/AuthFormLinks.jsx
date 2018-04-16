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

const LoginLinks = () => (
  <LinksWrapper>
    <span><Link to="/reset-password">Forgot Password</Link></span>
    <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
  </LinksWrapper>
);

const ResetLinks = () => (
  <LinksWrapper centered>
    <span><Link to="/login">Go Back to Sign In</Link></span>
  </LinksWrapper>
);

const SignupLinks = () => (
  <LinksWrapper centered>
    <span>Already have an account? <Link to="/login">Sign In</Link></span>
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
