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
import { setNewLoanUserAppliedValue } from '../actions/ui';
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

const HowWrapper = styled(Flex)`
  padding: 20px 30px 0;
`;

const HowTitle = AccountName.extend`
  margin-left: 0;
  margin-bottom: 3px;
  text-align: center;
  font-size: 29px;
`;

const HowUndertitle = styled.p`
  color: #808184;
  font-size: 14px;
  text-align: center;
`;

const HowList = styled(Flex)`
  margin: 26px 0 28px;
`;

const HowListItem = styled(Box)`
  text-align: center;
  font-size: 14px;
  color: #808184;
  position: relative;
`;

const HowListRect = styled.div`
  display: none;
  position: absolute;
  top: 34px;
  right: ${props => props.last ? '50%' : 0};
  left: ${props => props.first ? '50%' : 0};
  height: 7px;
  background-color: #d7d7d7;

  @media (min-width: 1080px) {
    display: block;
  }
`;

const HowListNumber = styled.span`
  position: relative;
  display: inline-block;
  width: 76px;
  height: 76px;
  color: white;
  line-height: 1.8em;
  text-align: center;
  font-size: 42px;
  font-weight: 600;
  background-color: #d7d7d7;
  border-radius: 50%;
  user-select: none;
  z-index: 1;
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
      newLoanModalShown
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
                data={loans}
              >
                <Flex width={1} alignItems="center" py={10} px={30}>
                  <SVGContainer w={48} h={48} fill="#d8d8d8">
                    <LoanIcon />
                  </SVGContainer>
                  <AccountName>Crypto Loans</AccountName>
                </Flex>
                <Divider width={1} />
                <HowWrapper flexDirection="column" alignItems="center">
                  <HowTitle>How it Works</HowTitle>
                  <HowUndertitle>
                    Loanz.io Application Process Made Easy. Receive and Approval
                    in as little as 12 hours.
                  </HowUndertitle>
                  <HowList flexWrap='wrap' justifyContent='center'>
                    <HowListItem width={[1, 1/2, 1/2, 1/5]} pt='0' px='10px' pb={[3, 3, 3, 0]}>
                      <HowListNumber>1</HowListNumber>
                      <p>Submit Application and receive commitment with terms and conditions within 12 - 48 hours.</p>
                      <HowListRect first />
                    </HowListItem>
                    <HowListItem width={[1, 1/2, 1/2, 1/5]} pt='0' px='10px' pb={[3, 3, 3, 0]}>
                      <HowListNumber>2</HowListNumber>
                      <p>Sign E-Agreement and after all paperwork completed Loan Becomes Instantly Available.</p>
                      <HowListRect />
                    </HowListItem>
                    <HowListItem width={[1, 1/2, 1/2, 1/5]} pt='0' px='10px' pb={[3, 3, 3, 0]}>
                      <HowListNumber>3</HowListNumber>
                      <p>Transfer crypto to our secured wallet and receive fiat funds directly into your bank account.</p>
                      <HowListRect />
                    </HowListItem>
                    <HowListItem width={[1, 1/2, 1/2, 1/5]} pt='0' px='10px' pb={[3, 3, 3, 0]}>
                      <HowListNumber>4</HowListNumber>
                      <p>Support your day-to-day personal or business operations with the cash you need.</p>
                      <HowListRect />
                    </HowListItem>
                    <HowListItem width={[1, 1/2, 1/2, 1/5]} pt='0' px='10px' pb={[3, 3, 3, 0]}>
                      <HowListNumber>5</HowListNumber>
                      <p>At the end of the loan term, pay back the principle and receive crypto back to your wallet.</p>
                      <HowListRect last />
                    </HowListItem>
                  </HowList>
                  <AccountButton onClick={this.handleModalOpen}>
                    Start Your Loan Application
                  </AccountButton>
                  <Divider width={1} mt={44} /> 
                </HowWrapper>
                <Flex width={1} py={20} px={30} justifyContent="space-between">
                  <Flex>
                    {accounts.map(a => (
                      <Flex key={a.id} flexDirection="column" pr={65}>
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
                    <AccountButton onClick={this.handleModalOpen}>
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
          height={'100%'}
          top={'60%'}
        >
          <NewLoanModal
            handleCancel={this.handleModalClose}
          />
        </TransparentModal>
      </Fragment>
    );
  }

  handleModalOpen = () => {
    const { setNewLoanUserAppliedValue, showNewLoanModal } = this.props;
    setNewLoanUserAppliedValue(false);
    showNewLoanModal();
  }

  handleModalClose = () => {
    const {
      hideNewLoanModal,
      newLoanUserApplied,
      fetchLoanApplications
    } = this.props;

    if (newLoanUserApplied) {
      fetchLoanApplications();
    }

    hideNewLoanModal();
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
    newLoanModalShown: state.modals.newLoanModalShown,
    newLoanUserApplied: state.ui.newLoanUserApplied
  };
};

const mapDispatchToProps = dispatch => ({
  fetchLoanApplications: () => {
    dispatch(fetchLoanApplications());
  },
  showNewLoanModal: () => dispatch(showNewLoanModal()),
  hideNewLoanModal: () => dispatch(hideNewLoanModal()),
  setNewLoanUserAppliedValue: (value) => {
    dispatch(setNewLoanUserAppliedValue(value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoansPage);
