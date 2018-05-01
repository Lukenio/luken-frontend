import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { connect } from 'react-redux';

import { ModalHeader, ModalBody, ModalFooter } from '../../ui/Modal.jsx';
import { AccountButton } from '../../ui/Button.jsx';
import { FormErrorAlert } from '../../auth/forms/Elements';
import { SERVER_URL } from '../../../utils/config';
import { checkHttpStatus, parseJSON } from '../../../utils';

const InfoBox = styled(Box)`
  font-weight: 600;
  font-size: 14px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 22px;
`;

class ChangePasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = { didSend: false, ownStatusText: null };
  }

  componentWillUnmount() {
    clearTimeout(this.closeModalTimeout);
  }

  render() {
    const { handleCancel } = this.props;
    const { didSend, ownStatusText } = this.state;

    if (didSend) {
      return (
        <ModalBody>
          <ModalHeader handleClose={handleCancel}>Change Password Request</ModalHeader>
          <Flex flex="1" w={1} px={25} py={30} flexDirection="column">
            <InfoBox>
              Check your email for a link to reset your password. 
              If it doesn't appear within a few minutes, check your spam folder.
            </InfoBox>
          </Flex>
        </ModalBody>
      );
    }

    return (
      <ModalBody>
        <ModalHeader handleClose={handleCancel}>Change Password Request</ModalHeader>
        <Flex flex="1" w={1} px={25} py={30} flexDirection="column">
          {ownStatusText && <FormErrorAlert statusText={ownStatusText} />}
          <InfoBox>
            After submitting the request to change password, <br />
            you will receive an email with instructions.
          </InfoBox>
        </Flex>
        <ModalFooter>
          <AccountButton w={169} onClick={this.handleClick}>
            Change Password
          </AccountButton>
        </ModalFooter>
      </ModalBody>
    );
  }

  handleClick = () => {
    const {
      userAccount: { username },
      handleCancel
    } = this.props;

    fetch(`${SERVER_URL}/api/v1/accounts/send-reset-password-link/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: username
      })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(() => {
        this.setState({ didSend: true });
        this.closeModalTimeout = setTimeout(handleCancel, 3000);
      })
      .catch(error => {
        this.setState({ ownStatusText: error.message });
      });
  }
}

const mapStateToProps = (state) => {
  return {
    userAccount: state.userAccount
  };
};

export default connect(mapStateToProps)(ChangePasswordModal);
