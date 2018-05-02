import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import { FlexContainer } from '../components/ui/Containers';
import { AccountButton } from '../components/ui/Button';
import { TransparentModal } from '../components/ui/Modal.jsx';
import SVGContainer from '../components/ui/SVGContainer';
import {
  BitcoinIcon,
  EthereumIcon
} from '../components/ui/SVGIcons.jsx';

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
import { getCRTickerSymbols, format0000 } from '../utils';

const WrapFlexContainer = styled(FlexContainer)`
  background: #ffffff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  flex: 1;
`;

const AccountName = styled.h3`
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

const CoinsOwned = styled.p`
  font-size: 24px;
  color: #4d92df;
  letter-spacing: 0;
  line-height: 38px;
  margin: 0;
`;

const CoinsPending = styled.p`
  font-size: 14px;
  color: rgba(155, 155, 155, 0.5);
  letter-spacing: 0;
  line-height: 22px;
  margin: 0;
`;

const supportedSymbols = ['btc', 'eth'];

class AccountDetailsPage extends Component {
  componentDidMount() {
    this.fetchAccountData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.accountId !== nextProps.accountId) {
      this.fetchAccountData(nextProps);
    }
  }

  fetchAccountData(props) {
    const {
      dataFetchAccountData,
      isFetching,
      accountSymbol,
      accountId
    } = props;

    if (supportedSymbols.some(t => t === accountSymbol)) {
      !isFetching && dataFetchAccountData(accountId);
    }
  }

  render() {
    const {
      account = {},
      isFetching,
      submitForm,
      withdrawModalShown,
      accountAddressModalShown,
      showWithdrawRequestModal,
      hideWithdrawRequestModal,
      showAccountAddressModal,
      hideAccountAddressModal
    } = this.props;

    return (
      <Fragment>
        <Header />
        <Flex width={1} flex="1">
          <SideNavigation />
          <Flex w={1} mt={30} mb={25} mx={30} flexDirection="column" style={{ minWidth: '200px' }}>
            <WrapFlexContainer flexDirection="column" w={1}>
              <DataLoaderPlaceholder
                isFetching={isFetching}
                isDataExists={account.id}
              >
                <Flex width={1} alignItems="center" py={10} px={30}>
                  <SVGContainer w={48} h={48} fill="#d8d8d8">
                    {account.type === 0 ? <BitcoinIcon /> : <EthereumIcon />}
                  </SVGContainer>
                  <AccountName>{account.name}</AccountName>
                </Flex>
                <Divider width={1} />
                <Flex width={1} py={20} px={30} justifyContent="space-between">
                  <Flex flexDirection="column">
                    <CoinsOwned>
                      <strong>{account.balance}</strong>{' '}
                      {getCRTickerSymbols(account.type)}
                    </CoinsOwned>
                    <CoinsPending>
                      Pending: {format0000(account.pending_withdrawal_request)} {getCRTickerSymbols(account.type)}
                    </CoinsPending>
                  </Flex>
                  <Flex>
                    <AccountButton flat onClick={showAccountAddressModal}>
                      Deposit
                    </AccountButton>
                    <Box w={15} />
                    <AccountButton onClick={showWithdrawRequestModal}>
                      Withdraw
                    </AccountButton>
                  </Flex>
                </Flex>
                <TransactionsList account={account} />
              </DataLoaderPlaceholder>
            </WrapFlexContainer>
            <Footer />
          </Flex>
        </Flex>
        <TransparentModal
          showModal={withdrawModalShown}
          width={460}
          height={620}
        >
          <WithdrawRequestModal
            handleSave={submitForm}
            handleCancel={hideWithdrawRequestModal}
            accountId={account.id}
            accountType={account.type}
          />
        </TransparentModal>
        <TransparentModal
          showModal={accountAddressModalShown}
          width={400}
          height={500}
        >
          <DepositModal
            handleCancel={hideAccountAddressModal}
            accountPubAddress={account.pub_address}
            accountType={account.type}
          />
        </TransparentModal>
      </Fragment>
    );
  }
}

const accountsIdMap = {
  btc: 0,
  eth: 1
};

const mapStateToProps = (state, { match: { params: { accountSymbol } } }) => {
  const accountType = accountsIdMap[accountSymbol];
  const accountId = state.userAccount.accountIdsByType[accountType];

  return {
    accountSymbol,
    accountId,
    account: state.coinAccounts.byId[accountId],
    isFetching: state.coinAccounts.isFetching,
    withdrawModalShown: state.modals.newWithdrawalRequestShown,
    accountAddressModalShown: state.modals.accountAddressShown
  };
};

const mapDispatchToProps = dispatch => ({
  submitForm: () => dispatch(submit('withdraw-request-form')),
  dataFetchAccountData: accountId =>
    accountId && dispatch(dataFetchAccountData(accountId)),
  showWithdrawRequestModal: () => dispatch(showWithdrawRequestModal()),
  hideWithdrawRequestModal: () => dispatch(hideWithdrawRequestModal()),
  showAccountAddressModal: () => dispatch(showAccountAddressModal()),
  hideAccountAddressModal: () => dispatch(hideAccountAddressModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsPage);
