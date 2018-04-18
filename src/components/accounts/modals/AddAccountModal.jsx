import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

import Button from '../../ui/Button';
import Scrollable from '../../ui/Scrollable.jsx';
import { PlaceholderImage } from '../../ui/Placeholders.jsx';
import { ModalHeader, ModalBody, ModalFooter } from '../../ui/Modal.jsx';

const AccountBox = styled(Flex)`
  border-radius: 6px;
  height: 135px;
  width: 135px;
  background: ${({ active }) => (active ? '#eeeeee' : 'inherit')};

  &:hover {
    cursor: pointer;
    background: #eeeeee;
  }
`;

const AccountTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 22px;
  margin: 4px 0 0;
`;

const AccountInfo = styled.span`
  font-size: 12px;
  color: rgba(155, 155, 155, 0.5);
  letter-spacing: 0;
  line-height: 19px;
  margin: 0;
`;

const accounts = [
  {
    name: 'Bitcoin',
    info: 'Digital Currency',
    type: 0
  },
  {
    name: 'Bitcoin Cache',
    info: 'Digital Currency',
    type: 1
  },
  {
    name: 'Litecoin',
    info: 'Digital Currency',
    type: 2
  }
];

class AddAccountModal extends Component {
  render() {
    const {
      chosenAccount,
      className,
      handleSave,
      handleCancel,
      handleAccountChoose
    } = this.props;

    return (
      <ModalBody>
        <ModalHeader handleClose={handleCancel}>Add New Account</ModalHeader>
        <Scrollable
          flex="1"
          width={1}
          flexDirection="row"
          flexWrap="wrap"
          p={30}
        >
          {accounts.map(a => (
            <AccountBox
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              key={a.type}
              onClick={() => handleAccountChoose(a)}
              active={chosenAccount && a.type === chosenAccount.type}
            >
              <PlaceholderImage size={48} />
              <AccountTitle>{a.name}</AccountTitle>
              <AccountInfo>{a.info}</AccountInfo>
            </AccountBox>
          ))}
        </Scrollable>
        <ModalFooter>
          <Button onClick={handleSave} disabled={!chosenAccount}>
            Add Account
          </Button>
        </ModalFooter>
      </ModalBody>
    );
  }
}

const StyledAddAccountModal = styled(AddAccountModal)`
  font-size: 14px;
  height: 100%;
`;

export default StyledAddAccountModal;
