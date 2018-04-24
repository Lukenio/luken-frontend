import React, { Component, Fragment } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { connect } from 'react-redux';

import dataFetchCoinsPrice from '../actions/coinsPrice';
import { FlexContainer } from '../components/ui/Containers';
import BTCApplyForm from '../components/apply/forms/BTCApplyForm';
import ETHApplyForm from '../components/apply/forms/ETHApplyForm';

import {
  BitcoinIconApply,
  EthereumIconApply,
} from '../components/ui/SVGIcons';

const ContentWrap = styled(Box)`
  background: #ffffff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.05);
  min-height: 642px;
`;

const LeadTitle = styled.h1`
  font-weight: 600;
  font-size: 30px;
  color: #4176d1;
  letter-spacing: -1px;
  text-align: center;
  line-height: 42px;
  margin: 0;
`;

const LeadText = styled.p`
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 18px;
  margin: 12px 0 0;
`;

const ThankYouHeading = LeadTitle.extend`
  color: #9b9b9b;
`;

const ThankYouText = LeadText.extend`
  color: #9b9b9b;
`;

const ContentHeaderWrapper = styled(Flex)`
  min-height: 167px;
  background: #ffffff;
  text-align: center;
  border-radius: 6px 6px 0 0;
`;

const CryptoAssetTitle = styled.h3`
  font-weight: 600;
  font-size: 18px;
  color: #4d4d4d;
  letter-spacing: -0.67px;
  text-align: center;
  line-height: 28px;
  margin: 0;
`;

const TabBoxWrapper = styled(Box)`
  cursor: pointer;
  display: inline-block;
  margin: 0 10px; 
  text-decoration: none;
  background: ${({ active }) => (active ? '#4176d1' : '#ffffff')};
  border-radius: 100px;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 16px;
  color: ${({ active }) => (active ? '#ffffff' : '#4176d1')};
  border-color: #224e88;
  border: 1px solid;
  text-align: left;
`;

const CryptocyrrencyTitle = styled.div`
  position: absolute;
  margin-top: 20px;
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: .2rem;
  text-align: center;
`;

const CryptoIcon = styled.div`
  display: inline-block;
  margin-top: 5px;
  margin-left: 25px;
  height: 50px;
  width: 50px;
  text-align: left;
  color: ${({ active }) => (active ? '#ffffff' : '#4176d1')};

  > svg {
    fill: ${({ active }) => (active ? '#ffffff' : '#4176d1')};
  }
`;

const Disclaimer = styled.p`
  text-decoration: none;
  opacity: 0.5;
  font-weight: 500;
  font-size: 12px;
  color: #323b45;
  letter-spacing: 0;
  line-height: 18px;
  margin-bottom: 4px;
  padding: 4px 110px;
  margin: 0;

  @media only screen and (max-width: 767px) {
    padding: 0 20px;
  }
`;

const Tabs = ({ currencies = [], activeType = 0, onChange }) => {
  // const currenciesNumber = currencies.length;
  // const width = currenciesNumber ? 1 / currenciesNumber : 1;

  return (
    <Flex w={1} pt={27} flexDirection="column" justifyContent="center" alignItems="center">
      <Box>
      {currencies.map(c => (
        <Tab
          active={c.type === activeType}
          icon={<c.icon />}
          onClick={() => {
            onChange(c);
          }}
          key={c.title}
          w={220}
        >
          {c.title}
        </Tab>
      ))}
      </Box>
    </Flex>
  );
};

const Tab = ({ active, children, icon, onClick, ...other }) => {
  return (
    <TabBoxWrapper
      active={active}
      onClick={onClick}
      flexDirection="column"
      alignItems="center"
      {...other}
    >
      <CryptoIcon active={active}>{icon}</CryptoIcon>
      <CryptocyrrencyTitle active={active}>{children}</CryptocyrrencyTitle>
    </TabBoxWrapper>
  );
};

class ApplyEmbedded extends Component {
  state = {
    activeCurrencyType: 0,
    currencies: [
      { type: 0, title: 'BITCOIN', icon: BitcoinIconApply },
      { type: 2, title: 'ETHERIUM', icon: EthereumIconApply }
    ]
  };

  componentWillMount() {
    this.props.dataFetchCoinsPrice();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.applied !== nextProps.applied
      && nextProps.applied
    ) {
      window.parent.postMessage({
        type: 'FORM_SUBMIT_SUCCESS'
      }, '*');
    }
  }

  handleTabClick = c => {
    this.setState({
      activeCurrencyType: c.type
    });
  };

  render() {
    const { applied } = this.props;
    const { activeCurrencyType, currencies } = this.state;

    return (
      <Fragment>
        <ContentWrap w={[1]} flexDirection="column">
          {applied ? (
            <Flex
              w={1}
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              px={[15, 0]}
              style={{ minHeight: '642px' }}
            >
              <ThankYouHeading>Thank You!</ThankYouHeading>
              <ThankYouText>
                You've successfully submitted an application! We are going to
                review your application in 24 hours. We will<br />send you an
                email once your loan application is approved.
              </ThankYouText>
            </Flex>
          ) : (
            <Fragment>
              <ContentHeaderWrapper pt={24} flexDirection="column">
                <CryptoAssetTitle>
                  What Cryptoasset Type are You Using for Collateral?
                </CryptoAssetTitle>
                <Tabs
                  currencies={currencies}
                  activeType={activeCurrencyType}
                  onChange={this.handleTabClick}
                />
              </ContentHeaderWrapper>
              {activeCurrencyType === currencies[0].type ? (
                <BTCApplyForm />
              ) : (
                <ETHApplyForm />
              )}
            </Fragment>
          )}
        </ContentWrap>

        <FlexContainer
          alignItems="center"
          justifyContent="center"
          my={30}
          centered={true}
        >
          <Disclaimer>
          * The Total Loan Amount will be calculated based on your Desired Loan Amount, Term of the Loan and Annual Percentage Rate (APR). Due to high volatility, the collateral amount based on 35% LTV of our perception of the yearly minimal price of the Btcoin and Eherium. Total Loan Amount includes all fees associated with your transactions. In order to receive the collateral back, total Loan Amount must be discharged on maturity date. The loan maturity date will be indicated on the final loan agreement. Email notification will be sent 30 days prior date of discharge
          </Disclaimer>
        </FlexContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  applied: state.ui.newLoanUserApplied
});

const mapDispatchToProps = {
  dataFetchCoinsPrice
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyEmbedded);
