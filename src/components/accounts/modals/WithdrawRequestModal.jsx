import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

import { ModalHeader, ModalBody, ModalFooter } from '../../ui/Modal.jsx';
import { AttentionRoundIcon } from '../../ui/SVGIcons.jsx';
import { AccountButton } from '../../ui/Button.jsx';
import WithdrawRequestForm from '../forms/WithdrawRequestForm';

const InfoBox = styled(Box)`
  font-size: 14px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 22px;
`;

const DividerBox = styled(Box)`
  width: 100%;
  height: 1px;
  background: rgba(151, 151, 151, 0.2);
`;

const AttentionText = styled(Box)`
  font-weight: 600;
  font-size: 14px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 22px;
`;

class WithdrawRequestModal extends Component {
  render() {
    const { accountId, handleCancel, handleSave } = this.props;

    return (
      <ModalBody>
        <ModalHeader handleClose={handleCancel}>Withdraw Request</ModalHeader>
        <Flex flex="1" w={1} px={25} py={30} flexDirection="column">
          <InfoBox>
            Enter the Bitcoin Address and needed amount for the Withdrawal
            request.
          </InfoBox>
          <DividerBox my={25} />
          <WithdrawRequestForm accountId={accountId} />
          <DividerBox my={25} />
          <Flex alignItems="center">
            <AttentionRoundIcon />
            <AttentionText ml={10}>
              Make sure to use valid address for Withdraw.<br />
              We can't refund an incorrect withdrawal.
            </AttentionText>
          </Flex>
        </Flex>
        <ModalFooter>
          <AccountButton w={169} onClick={handleSave}>
            Send
          </AccountButton>
        </ModalFooter>
      </ModalBody>
    );
  }
}

export default WithdrawRequestModal;
