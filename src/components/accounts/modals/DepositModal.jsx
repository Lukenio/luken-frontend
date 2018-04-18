import React, { Component } from 'react';
import styled from 'styled-components';
import { Box } from 'grid-styled';

import { ModalBody } from '../../ui/Modal.jsx';
import { AccountButton } from '../../ui/Button.jsx';
import { getCRTickerSymbols, getCRTickerTitle } from '../../../utils';

const ModalHeading = styled(Box)`
  font-weight: 500;
  font-size: 20px;
  color: #ffffff;
  letter-spacing: -0.67px;
  line-height: 32px;
`;

const PublicAddressCodeBox = styled.img`
  min-height: 200px;
  min-width: 200px;
  height: 200px;
  width: 200px;
  margin-bottom: 14px;
`;

const Warning = styled(Box)`
  opacity: 0.7;

  letter-spacing: 0;
  text-align: center;
  line-height: 22px;
`;

const generateGoogleChartQRCode = (type, address) => {
  if (type === 0)
    return `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=bitcoin:${address}`;
  if (type === 1)
    return `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${address}&choe=UTF-8`;
  // Default
  return 'https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=No+Content&choe=UTF-8';
};

class DepositModal extends Component {
  render() {
    const { accountType, accountPubAddress, handleCancel } = this.props;

    const qrImageSrc = generateGoogleChartQRCode(
      accountType,
      accountPubAddress
    );

    return (
      <ModalBody flat alignItems="center">
        <ModalHeading mb="24px">Account Address</ModalHeading>
        <PublicAddressCodeBox src={qrImageSrc} />
        <Box mb="8px">{accountPubAddress}</Box>
        <Box mb="13px">
          <strong>
            Only send {getCRTickerTitle(accountType)} ({getCRTickerSymbols(
              accountType
            )}) to this address.
          </strong>
        </Box>
        <Warning mb="27px">
          Any other asset to this address, including ETC and<br />
          ERC20 tokens, will be permanently lost.
        </Warning>
        <AccountButton onClick={handleCancel}>Close</AccountButton>
      </ModalBody>
    );
  }
}

export default DepositModal;
