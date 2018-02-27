import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Wrapper from './Wrapper';

class Login extends Component {
  render() {
    return (
      <Wrapper>
        <div className="login_form">
          <h1 className="login_form__title">Sign In to Wallet</h1>
          <form>
            <FormGroup
              controlId="email"
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="text"
                placeholder=""
              />
              <FormControl.Feedback />
              <HelpBlock>Please fill out this field.</HelpBlock>
            </FormGroup>
            <FormGroup
              controlId="password"
            >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="text"
                placeholder=""
              />
              <FormControl.Feedback />
              <HelpBlock>Please fill out this field.</HelpBlock>
            </FormGroup>
            <Button block>Sign In</Button>
          </form>
          <div className="login_form__footer">
            <Link to={`/password-reset`}>Forgot Password?</Link>
            <div>Don't have an account? <Link to={`/signup`}>Sign Up</Link></div>
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default Login;
