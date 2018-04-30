import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { connect } from 'react-redux';

import { PlaceholderImage } from '../components/ui/Placeholders';
import { FlexContainer } from '../components/ui/Containers';
import { AccountButton } from '../components/ui/Button';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SideNavigation from '../components/layout/SideNavigation';
import DataLoaderPlaceholder from '../components/ui/DataLoaderPlaceholder';
import LoansList from '../components/loans/LoansList';

import { fetchLoanApplications } from '../actions/loan-applications';

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
    // this.fetchLoans(this.props);
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
      loans,
      isFetching
    } = this.props;

    return (
      <Fragment>
        <Header />
        <Flex width={1} flex="1">
          <SideNavigation />
          <Flex w={1} mt={30} mb={25} mx={30} flexDirection="column">
            <WrapFlexContainer flexDirection="column" w={1}>
              <DataLoaderPlaceholder
                isFetching={isFetching}
                isDataExists={true}
              >
                <Flex width={1} alignItems="center" py={10} px={30}>
                  <PlaceholderImage size={48} />
                  <AccountName>Crypto Loans</AccountName>
                </Flex>
                <Divider width={1} />
                <Flex width={1} py={20} px={30} justifyContent="space-between">
                  <Flex>
                    <Flex flexDirection="column">
                      <CoinsOwned>
                        <strong>6.01503759</strong>{' '}
                        BTC
                      </CoinsOwned>
                      <CoinsPending>
                        Pending: 0,0000 BTC
                      </CoinsPending>
                    </Flex>
                    <Box w={65} />
                    <Flex flexDirection="column">
                      <CoinsOwned>
                        <strong>50.12531328</strong>{' '}
                        ETH
                      </CoinsOwned>
                      <CoinsPending>
                        Pending: 50,12531328 ETH
                      </CoinsPending>
                    </Flex>
                  </Flex>
                  <Flex>
                    <AccountButton flat>
                      New Loan
                    </AccountButton>
                    <Box w={15} />
                    <AccountButton>
                      Repay Loan
                    </AccountButton>
                  </Flex>
                </Flex>
                <LoansList list={loans} />
              </DataLoaderPlaceholder>
            </WrapFlexContainer>
            <Footer />
          </Flex>
        </Flex>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { loanApplications } = state;

  const loans = loanApplications.allIds.map((id) => {
    return loanApplications.byId[id];
  });

  return {
    loans,
    isFetching: loanApplications.isFetching
  };
};

const mapDispatchToProps = dispatch => ({
  fetchLoanApplications: () => {
    dispatch(fetchLoanApplications());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoansPage);
