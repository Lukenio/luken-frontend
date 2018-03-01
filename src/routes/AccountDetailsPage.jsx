import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { connect } from 'react-redux';
import { PlaceholderImage } from '../components/ui/Placeholders';
import Header from '../components/layout/Header';
import SideNavigation from '../components/layout/SideNavigation';
import { FlexContainer } from '../components/ui/Containers';
import TransactionsList from '../components/accounts/TransactionsList';
import { dataFetchAccountData } from '../actions/coin-accounts';
import { getCRTickerSymbols } from '../utils';

const WrapFlexContainer = styled(FlexContainer)`
  background: #ffffff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  margin: 30px;
`;

const AccountName = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #9b9b9b;
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
  color: #9b9b9b;
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

class AccountDetailsPage extends Component {
  componentWillMount() {
    const {
      dataFetchAccountData,
      match: { params: { accountId } }
    } = this.props;
    dataFetchAccountData(accountId);
  }

  render() {
    const { account = {}, isFetching } = this.props;

    return (
      <Fragment>
        <Header />
        <Flex width={1} flex="1">
          <SideNavigation />
          <WrapFlexContainer flexDirection="column">
            {isFetching && <h3>Loading</h3>}
            {!isFetching && (
              <Fragment>
                <Flex width={1} alignItems="center" py={10} px={30}>
                  <PlaceholderImage size={48} />
                  <AccountName>{account.name}</AccountName>
                </Flex>
                <Divider width={1} />
                <Flex width={1} flexDirection="column" py={20} px={30}>
                  <CoinsOwned>
                    <strong>0.00</strong> {getCRTickerSymbols(account.type)}
                  </CoinsOwned>
                  <CoinsPending>
                    Pending: 0.00 {getCRTickerSymbols(account.type)}
                  </CoinsPending>
                </Flex>
                <TransactionsList account={account} />
              </Fragment>
            )}
          </WrapFlexContainer>
        </Flex>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, { match: { params: { accountId } } }) => ({
  account: state.coinAccounts.byId[accountId],
  isFetching: state.coinAccounts.isFetching
});

const mapDispatchToProps = {
  dataFetchAccountData
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsPage);
