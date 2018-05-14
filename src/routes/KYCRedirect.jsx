import { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class KYCRedirect extends Component {
  componentWillMount() {
    this.checkProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkProps(nextProps);
  }

  checkProps(props) {
    const {
      dispatch,
      userAccount: { isFetching, kyc_applied }
    } = props;
    
    if (!isFetching && typeof kyc_applied === 'boolean') {
      dispatch(push('/loans'));
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    userAccount: state.userAccount
  };
};

export default connect(mapStateToProps)(KYCRedirect);
