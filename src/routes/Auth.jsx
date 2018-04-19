import React, { Component, Fragment } from 'react';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { FlexContainer } from '../components/ui/Containers.jsx';
import SignupForm from '../components/auth/forms/SignupForm.jsx';
import SigninForm from '../components/auth/forms/SigninForm.jsx';
import ForgotPasswordForm from '../components/auth/forms/ForgotPasswordForm.jsx';
import ResetPasswordForm from '../components/auth/forms/ResetPasswordForm.jsx';
import AccountVerificationForm from '../components/auth/forms/AccountVerificationForm.jsx';
import AuthFormLinks from '../components/auth/AuthFormLinks.jsx';
import SimpleHeader from '../components/layout/SimpleHeader.jsx';
import { authCleanStatusText } from '../actions/auth';

const LeadHeading = styled.p`
  font-size: 30px;
  color: #9b9b9b;
  letter-spacing: -1px;
  text-align: center;
  line-height: 40px;
  text-align: center;
`;

const Content = styled(Box)`
  margin: 0;
`;

class Base extends Component {
  componentWillMount() {
    this.checkRedirect(this.props);
  }

  componentWillUnmount() {
    if (typeof this.props.cleanStatusText === 'function') {
      this.props.cleanStatusText();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.checkRedirect(nextProps);
  }

  checkRedirect(props) {
    const { userId, isAuthenticated, homeRedirect } = props;

    if (isAuthenticated) {
      homeRedirect(userId);
    }
  }

  render() {
    const { title, children } = this.props;
    return (
      <Fragment>
        <SimpleHeader />
        <FlexContainer
          alignItems="center"
          justifyContent="center"
          width={1}
          flex="1"
        >
          <Content>
            <LeadHeading>{title}</LeadHeading>
            {children}
            <AuthFormLinks />
          </Content>
        </FlexContainer>
      </Fragment>
    );
  }
}

const SignupRoute = ({ statusText, ...other }) => (
  <Base title="Create account" {...other}>
    <SignupForm statusText={statusText} />
  </Base>
);

const SigninRoute = ({ statusText, ...other }) => (
  <Base title="Sign in to Wallet" {...other}>
    <SigninForm statusText={statusText} />
  </Base>
);

const ForgotPasswordRoute = ({ statusText, ...other }) => (
  <Base title="Reset Password" {...other}>
    <ForgotPasswordForm />
  </Base>
);

const ResetPasswordRoute = ({ statusText, ...other }) => (
  <Base title="Reset Password" {...other}>
    <ResetPasswordForm />
  </Base>
);

const AccountVerificationRoute = ({ statusText, ...other }) => (
  <Base title="Account Verification" {...other}>
    <AccountVerificationForm />
  </Base>
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userId: state.auth.userId,
  statusText: state.auth.statusText
});

const mapDispatchToProps = dispatch => ({
  homeRedirect: () => dispatch(push('/home')),
  cleanStatusText: () => dispatch(authCleanStatusText())
});

export const Signin = connect(mapStateToProps, mapDispatchToProps)(SigninRoute);
export const Signup = connect(mapStateToProps, mapDispatchToProps)(SignupRoute);
export const ForgotPassword = connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordRoute);
export const ResetPassword = connect(mapStateToProps, mapDispatchToProps)(ResetPasswordRoute);
export const AccountVerification = connect(mapStateToProps, mapDispatchToProps)(AccountVerificationRoute);
