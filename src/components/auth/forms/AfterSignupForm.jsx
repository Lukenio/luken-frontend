import React, { Component } from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { FormWrapper } from './Elements.jsx';

const Circle = styled.div`
  width: 120px;
  height: 120px;
  background: #D8D8D8;
  border-radius: 50%;
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
          <Circle />
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
