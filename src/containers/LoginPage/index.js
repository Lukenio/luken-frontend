import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { loginRequest } from 'redux/user/actions';

import Wrapper from './Wrapper';

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  }

  static propTypes = {
    handleLogin: PropTypes.func.isRequired,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  onSignIn = () => {
    const { email, password } = this.state;

    this.props.handleLogin({
      username: 'polinom',
      password: 'pass1234'
    })
  }

  render() {
    const { email, password } = this.state;
    console.log(this.props)
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
                onChange={this.handleChange}
                value={email}
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
            <Button
              onClick={this.onSignIn}
              block
            >
              Sign In
            </Button>
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

function mapDispatchToProps(dispatch) {
  return {
    handleLogin: (payload) => dispatch(loginRequest(payload))
  }
};

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
