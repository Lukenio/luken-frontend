import React, { Component } from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { FormWrapper } from './Elements.jsx';

const EmailIcon = styled(Flex)`
  width: 120px;
  height: 120px;
  background: #D8D8D8;
  border-radius: 50%;
`;

const EmailIconImage = styled.img`
  width: 92px;
  height: 68px;
`;

class AfterSignupForm extends Component {
  componentWillMount() {
    const { didRegister, loginRedirect } = this.props;
    this.email = localStorage.getItem('email');
    
    if (!(didRegister && this.email)) {
      loginRedirect();
    }
  }

  render() {
    return (
      <FormWrapper>
        <Flex flexDirection="column" alignItems="center">
          <EmailIcon justifyContent="center" alignItems="center">
            <EmailIconImage src="/images/email-icon.png" alt="Email icon" />
          </EmailIcon>
          <p style={{ textAlign: 'center' }}>
            We sent a verification email to {this.email}. Click the link inside to get started!
          </p>
        </Flex>
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  didRegister: state.auth.isRegistred
});

const mapDispatchToProps = dispatch => ({
  loginRedirect: () => dispatch(push('/login'))
});

export default connect(mapStateToProps, mapDispatchToProps)(AfterSignupForm);
