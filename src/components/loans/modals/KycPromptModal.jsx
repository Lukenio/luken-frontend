import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { ModalHeader, ModalBody, ModalFooter } from '../../ui/Modal.jsx';
import { AttentionRoundIcon } from '../../ui/SVGIcons.jsx';
import { AccountButton } from '../../ui/Button.jsx';

const AttentionText = styled(Box)`
  font-weight: 600;
  font-size: 14px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 22px;
`;

class KycPromptModal extends Component {
  render() {
    const { handleCancel } = this.props;

    return (
      <ModalBody>
        <ModalHeader handleClose={handleCancel}>Account Not Verified</ModalHeader>
        <Flex flex="1" w={1} px={25} py={30} flexDirection="column">
          <Flex alignItems="flex-start">
            <div style={{ paddingTop: '4px' }}>
              <AttentionRoundIcon />
            </div>
            <AttentionText ml={10}>
              Verification is required to comply with KYC/AML regulations and
              to protect your account from unauthorized access.
            </AttentionText>
          </Flex>
        </Flex>
        <ModalFooter>
          <AccountButton w={169} onClick={this.handleClick}>
            Verify Your Account
          </AccountButton>
        </ModalFooter>
      </ModalBody>
    );
  }

  handleClick = () => {
    const {
      handleCancel,
      dispatch
    } = this.props;

    handleCancel();
    dispatch(push('/profile'));
  }
}

const mapStateToProps = (state) => {
  return {
    userAccount: state.userAccount
  };
};

export default connect(mapStateToProps)(KycPromptModal);
