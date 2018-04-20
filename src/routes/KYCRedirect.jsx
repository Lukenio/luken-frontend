import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class KYCRedirect extends Component {
  componentWillMount() {
    const { didApplyKYC, dispatch } = this.props;
    dispatch(push(didApplyKYC ? '/a/btc' : '/kyc'));
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    didApplyKYC: state.userAccount.kyc_applied
  };
};

export default connect(mapStateToProps)(KYCRedirect);
