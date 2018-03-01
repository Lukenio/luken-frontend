import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

export default function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
      }).isRequired,
      dispatch: PropTypes.func.isRequired
    };

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {
      if (!this.props.isAuthenticated) {
        // const redirectAfterLogin = this.props.location.pathname;
        this.props.dispatch(push('/login'));
      }
    }

    render() {
      return (
        <Fragment>
          {this.props.isAuthenticated === true ? (
            <Component {...this.props} />
          ) : null}
        </Fragment>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      token: state.auth.token
    };
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}
