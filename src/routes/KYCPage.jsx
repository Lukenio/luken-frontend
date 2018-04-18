import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import { PlaceholderImage } from '../components/ui/Placeholders';
import { FlexContainer } from '../components/ui/Containers';
import { AccountButton } from '../components/ui/Button';
import { TransparentModal } from '../components/ui/Modal.jsx';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SideNavigation from '../components/layout/SideNavigation';
import DataLoaderPlaceholder from '../components/ui/DataLoaderPlaceholder';
import TransactionsList from '../components/accounts/TransactionsList';
import WithdrawRequestModal from '../components/accounts/modals/WithdrawRequestModal';
import DepositModal from '../components/accounts/modals/DepositModal';

import { dataFetchAccountData } from '../actions/coin-accounts';
import {
  showWithdrawRequestModal,
  hideWithdrawRequestModal,
  showAccountAddressModal,
  hideAccountAddressModal
} from '../actions/modals';
import { getCRTickerSymbols } from '../utils';

const WrapFlexContainer = styled(FlexContainer)`
  background: #ffffff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  flex: 1;
`;

const Heading = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #4d92df;
  letter-spacing: -0.67px;
  line-height: 32px;
  margin-left: 10px;
`;

const Divider = styled(Box)`
  border-bottom: 1px solid #979797;
  opacity: 0.2;
`;

const Loading = styled.p`
  font-size: 14px;
  color: #4d92df;
  letter-spacing: 0;
  line-height: 22px;
  margin: 0;
`;

class KYC extends Component {
  renderIframe(userId) {
    return (
      <iframe
        id="JotFormIFrame-80925336043252"
        onload="window.parent.scrollTo(0,0)"
        allowtransparency="true"
        allowfullscreen="true"
        allow="geolocation; microphone; camera"
        src={`https://form.jotform.com/80925336043252?userid=${userId}`}
        frameborder="0"
        style={{ width: '1px', minWidth: '100%', height: 539, border: 'none' }}
        scrolling="no"
      />
    );
  }

  render() {
    const { userId } = this.props;

    return (
      <Fragment>
        <Header />
        <Flex width={1} flex="1">
          <SideNavigation />
          <Flex w={1} mt={30} mb={25} mx={30} flexDirection="column">
            <WrapFlexContainer flexDirection="column" w={1}>
              <Flex width={1} alignItems="center" py={10} px={30}>
                <Heading>KYC</Heading>
              </Flex>
              <Divider width={1} />
              <Flex width={1} py={20} px={30} justifyContent="space-between">
                {userId ? (
                  this.renderIframe(userId)
                ) : (
                  <Loading>Loading...</Loading>
                )}
              </Flex>
            </WrapFlexContainer>
            <Footer />
          </Flex>
        </Flex>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const userId = state.userAccount.id;

  return {
    userId
  };
};

export default connect(mapStateToProps)(KYC);
