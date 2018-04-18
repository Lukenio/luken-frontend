import React, { Component, Fragment } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { connect } from 'react-redux';

import dataFetchCoinsPrice from '../actions/coinsPrice';
import SVGContainer from '../components/ui/SVGContainer';
import { FlexContainer } from '../components/ui/Containers';
import BTCApplyForm from '../components/apply/forms/BTCApplyForm';
import ETHApplyForm from '../components/apply/forms/ETHApplyForm';
import Navigation from '../components/ui/Navigation';

import {
  PhoneIcon,
  EmailIcon,
  LocationIcon,
  FacebookIcon,
  TwitterIcon,
  GoogleIcon,
  InstagrammIcon,
  BitcoinIconApply,
  EthereumIconApply,
} from '../components/ui/SVGIcons';

const Footer = styled(Flex)`
  min-height: 297px;
  background: #323b45;
`;

const ContentWrap = styled(Box)`
  background: #ffffff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
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


const FooterColumnHeading = styled.h4`
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 22px;
  margin: 0 0 15px;
`;

const FooterText = styled.span`
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 18px;
`;

const FooterLink = styled.a`
  text-decoration: none;

  opacity: 0.5;
  font-weight: 500;
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 18px;
  margin-bottom: 4px;

  &[href^='tel:'],
  &[href^='mailto:'] {
    font-weight: 600;
    opacity: 1;
    margin-bottom: 0;
  }
`;

const FooterSocialLink = styled.a`
  margin-left: 15px;

  @media only screen and (max-width: 767px) {
    margin-right: 15px;
  }
`;

const CopyrightBox = styled(Box)`
  border-top: 1px solid rgba(155, 155, 155, 0.3);
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 18px;
  text-align: center;
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

class Apply extends Component {
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
        <Navigation />

        <FlexContainer
          alignItems="center"
          justifyContent="center"
          my={30}
          centered={true}
        >
          <Flex alignItems="center" flexDirection="column">
            <LeadTitle>Apply in under 1 minute</LeadTitle>
          </Flex>
        </FlexContainer>

        <FlexContainer
          alignItems="center"
          justifyContent="center"
          my={10}
          centered={true}
        >
          <ContentWrap w={[1, 767, 870]} flexDirection="column">
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
        </FlexContainer>

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

        <Footer w={1} alignItems="center" flexDirection="column">
          <Flex
            w={[1, 767, 870]}
            mt={[20, 55]}
            px={[20, 0]}
            flexDirection={['column', 'row']}
          >
            <Flex w={[1, 1 / 3]} mb={[20, 0]} flexDirection="column">
              <FooterColumnHeading>Contact Us</FooterColumnHeading>
              <Flex alignItems="center" mb="8px">
                <SVGContainer w={12} h={12} mr={10}>
                  <PhoneIcon />
                </SVGContainer>
                <FooterText style={{ marginRight: 5 }}>Toll Free:</FooterText>
                {'  '}
                <FooterLink href="tel:1-833-534-2255">
                  1-833-534-2255
                </FooterLink>
              </Flex>
              <Flex alignItems="center" mb="8px">
                <SVGContainer w={12} h={9} mr={10}>
                  <EmailIcon />
                </SVGContainer>
                <FooterLink href="mailto:info@loanz.io">
                  info@loanz.io
                </FooterLink>
              </Flex>
              <Flex alignItems="center" mb="8px">
                <SVGContainer w={20} h={20} mr={10} mb={35}>
                  <LocationIcon />
                </SVGContainer>
                <FooterText>
                  <strong>15 Wertheim Court Unit 203A Richmond Hill, ON L4B 3H7</strong>
                </FooterText>
              </Flex>
            </Flex>
            <Flex
              w={[1, 1 / 2]}
              mb={[20, 0]}
              justifyContent={['flex-start', 'center']}
            >
              <Flex flexDirection="column" w={[1, 'inherit']}>
                <FooterColumnHeading>Categories</FooterColumnHeading>
                <Flex
                  w={1}
                  flexDirection={['row', 'column']}
                  flexWrap
                  justifyContent={['space-between', 'flex-start']}
                >
                  <FooterLink href="/apply/">Apply for Loan</FooterLink>
                  <FooterLink href="https://loanz.io/buy-bitcoin/">Buy Bitcoin</FooterLink>
                  <FooterLink href="https://loanz.io/digital-wallet/">Digital Wallet</FooterLink>
                  <FooterLink href="https://loanz.io/company/">Our Company</FooterLink>
                  <FooterLink href="https://loanz.io/faqs/">FAQ</FooterLink>
                  <FooterLink href="https://loanz.io/contact-support/">Contact Us</FooterLink>
                </Flex>
              </Flex>
            </Flex>

            <Flex
              w={[1, 1 / 2]}
              mb={[20, 0]}
              justifyContent={['flex-start', 'center']}
            >
              <Flex flexDirection="column" w={[1, 'inherit']}>
                <FooterColumnHeading>Legal Information</FooterColumnHeading>
                <Flex
                  w={1}
                  flexDirection={['row', 'column']}
                  flexWrap
                  justifyContent={['space-between', 'flex-start']}
                >
                  <FooterLink href="https://loanz.io/privacy-policy/">Privacy Policy</FooterLink>
                  <FooterLink href="https://loanz.io/terms-of-service/"> Terms of Service</FooterLink>
                  <FooterLink href="https://loanz.io/aml-and-kyc-policy/"> AML and KYC Policy</FooterLink>
                  <FooterLink href="https://loanz.io/verification-guide/">Verification Guide</FooterLink>
                </Flex>
              </Flex>
            </Flex>

            <Flex
              w={[1, 1 / 6]}
              flexDirection="column"
              alignItems={['flex-start', 'flex-end']}
            >
              <FooterColumnHeading style={{ paddingRight: 17 }}>
                Follow Us
              </FooterColumnHeading>
              <Flex alignItems="flex-start">
                <FooterSocialLink href="https://www.facebook.com/Loanz-Fiat-Loans-for-Crypto-Community-310966579427905/">
                  <SVGContainer w={6} h={12}>
                    <FacebookIcon />
                  </SVGContainer>
                </FooterSocialLink>
                <FooterSocialLink href="https://plus.google.com/u/5/105757677441837867265">
                  <SVGContainer w={20} h={12}>
                    <GoogleIcon />
                  </SVGContainer>
                </FooterSocialLink>
                <FooterSocialLink href="https://twitter.com/loanzio">
                  <SVGContainer w={15} h={12}>
                    <TwitterIcon />
                  </SVGContainer>
                </FooterSocialLink>
                <FooterSocialLink href="https://www.instagram.com/loanzio">
                  <SVGContainer w={13} h={12}>
                    <InstagrammIcon />
                  </SVGContainer>
                </FooterSocialLink>
              </Flex>
            </Flex>
          </Flex>
          <CopyrightBox w={[1, 767, 870]} mt={40} p={16}>
            {'© '}
            {new Date().getFullYear()}
            {' LOANZ.IO. All Rights Reserved.'}
          </CopyrightBox>
        </Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Apply);
