import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { connect } from 'react-redux';

import { FlexContainer } from '../components/ui/Containers';
import { AccountButton } from '../components/ui/Button';
import { TransparentModal } from '../components/ui/Modal.jsx';
import SVGContainer from '../components/ui/SVGContainer';
import {
  LoanIcon
} from '../components/ui/SVGIcons.jsx';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SideNavigation from '../components/layout/SideNavigation';
import DataLoaderPlaceholder from '../components/ui/DataLoaderPlaceholder';
import LoansList from '../components/loans/LoansList';
import NewLoanModal from '../components/loans/modals/NewLoanModal';

import { fetchLoanApplications } from '../actions/loan-applications';
import {
  showNewLoanModal,
  hideNewLoanModal
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

class LoansPage extends Component {
  componentDidMount() {
    this.fetchLoans(this.props);
  }

  fetchLoans(props) {
    const {
      isFetching,
      fetchLoanApplications
    } = props;

    if (!isFetching) {
      fetchLoanApplications();
    }
  }

  render() {
    const {
      accounts,
      loans,
      isFetching,
      newLoanModalShown,
      showNewLoanModal,
      hideNewLoanModal
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
                isDataExists={true}
              >
                <Flex width={1} alignItems="center" py={10} px={30}>
                  <SVGContainer w={48} h={48} fill="#d8d8d8">
                    <LoanIcon />
                  </SVGContainer>
                  <AccountName>Crypto Loans</AccountName>
                </Flex>
                <Divider width={1} />
                <Flex width={1} py={20} px={30} justifyContent="space-between">
                  <Flex>
                    {accounts.map(a => (
                      <Flex flexDirection="column" pr={65}>
                        <CoinsOwned>
                          <strong>{a.balance}</strong>{' '}
                          {getCRTickerSymbols(a.type)}
                        </CoinsOwned>
                        <CoinsPending>
                          Pending: {format0000(a.pending_withdrawal_request)}{' '}
                          {getCRTickerSymbols(a.type)}
                        </CoinsPending>
                      </Flex>
                    ))}
                  </Flex>
                  <Flex>
                    <AccountButton onClick={showNewLoanModal}>
                      New Loan
                    </AccountButton>
                  </Flex>
                </Flex>
                <LoansList list={loans} />
              </DataLoaderPlaceholder>
            </WrapFlexContainer>
            <Footer />
          </Flex>
        </Flex>
        <TransparentModal
          showModal={newLoanModalShown}
          width={900}
          height={450}
        >
          <NewLoanModal
            handleCancel={hideNewLoanModal}
          />
        </TransparentModal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    userAccount: { accountIdsByType },
    coinAccounts,
    loanApplications
  } = state;

  const accountIds = [accountIdsByType[0], accountIdsByType[1]];
  const accounts = accountIds.map(id => coinAccounts.byId[id]);

  const loans = loanApplications.allIds.map((id) => {
    return loanApplications.byId[id];
  });

  return {
    accounts,
    loans,
    isFetching: loanApplications.isFetching,
    newLoanModalShown: state.modals.newLoanModalShown
  };
};

const mapDispatchToProps = dispatch => ({
  fetchLoanApplications: () => {
    dispatch(fetchLoanApplications());
  },
  showNewLoanModal: () => dispatch(showNewLoanModal()),
  hideNewLoanModal: () => dispatch(hideNewLoanModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoansPage);
