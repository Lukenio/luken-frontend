import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';

class SignupPage extends Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  onSignIn = () => {
    const { email, password } = this.state;

    this.props.handleLogin({
      login: 'polinom',
      password: 'pass1234'
    })
  }

  render() {
    const { email, password } = this.state;
  
    return (
      <Wrapper>
        <div className="signup_form">
          <h1 className="signup_form__title">Create Account</h1>
          <form>
            <FormGroup
              controlId="name"
            >
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                placeholder=""
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
              <HelpBlock>Please fill out this field.</HelpBlock>
            </FormGroup>
            <FormGroup
              controlId="email"
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="text"
                placeholder=""
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
              <HelpBlock>Please fill out this field.</HelpBlock>
            </FormGroup>
            <FormGroup
              controlId="password"
            >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                placeholder=""
                onChange={this.handleChange}
                value={password}
              />
              <FormControl.Feedback />
              <HelpBlock>Please fill out this field.</HelpBlock>
            </FormGroup>
            <FormGroup
              controlId="confirmPassword"
            >
              <ControlLabel>Confirm Password</ControlLabel>
              <FormControl
                type="password"
                placeholder=""
                onChange={this.handleChange}
                value={password}
              />
              <FormControl.Feedback />
              <HelpBlock>Please fill out this field.</HelpBlock>
            </FormGroup>
            <Button
              onClick={this.onSignIn}
              block
            >
              Create Account
            </Button>
          </form>
          <div className="signup_form__footer">
            <div>Already have an account? <Link to={`/login`}>Sign In</Link></div>
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default SignupPage;
