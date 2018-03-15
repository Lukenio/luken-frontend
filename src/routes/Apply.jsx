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

import btcLogo from '../components/apply/images/btc.png';
import ethLogo from '../components/apply/images/eth.png';

import {
  PhoneIcon,
  EmailIcon,
  LocationIcon,
  FacebookIcon,
  TwitterIcon,
  GoogleIcon,
  LinkedInIcon
} from '../components/ui/SVGIcons';

// const Title = styled.span`
//   font-weight: 500;
//   font-size: 14px;
//   color: #ffffff;
//   letter-spacing: 0;
//   text-align: center;
//   line-height: 22px;
//   margin-left: 7px;
// `;

const CryptoIconImg = styled.img`
  height: 50px;
  width: 50px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  opacity: ${({ active }) => (active ? '1' : '0.3')};
`;

const Footer = styled(Flex)`
  height: 297px;
  background: #323b45;
`;

const ContentWrap = styled(Box)`
  background: #ffffff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  height: 642px;
`;

const LeadTitle = styled.h1`
  font-weight: 600;
  font-size: 30px;
  color: #2893ef;
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
  height: 167px;
  background: #2893ef;
  text-align: center;
  border-radius: 6px 6px 0 0;
`;

const CryptoAssetTitle = styled.h3`
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  letter-spacing: -0.67px;
  text-align: center;
  line-height: 28px;
  margin: 0;
`;

const TabBoxWrapper = styled(Box)`
  text-align: center;
  background: #2893ef;
  border-bottom-width: : 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ active }) => (active ? '#fff' : '#9B9B9B')};
  cursor: pointer;
`;

const CryptocyrrencyTitle = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: ${({ active }) => (active ? '#fff' : 'rgba(255, 255, 255, 0.25)')};
  letter-spacing: 0;
  text-align: center;
  line-height: 22px;
  margin: 5px 0 10px;
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
`;

const Tabs = ({ currencies = [], activeType = 0, onChange }) => {
  const currenciesNumber = currencies.length;
  const width = currenciesNumber ? 1 / currenciesNumber : 1;

  return (
    <Flex w={1} pt={27}>
      {currencies.map(c => (
        <Tab
          active={c.type === activeType}
          image={c.image}
          onClick={() => {
            onChange(c);
          }}
          w={width}
        >
          {c.title}
        </Tab>
      ))}
    </Flex>
  );
};

const Tab = ({ active, children, image, onClick, ...other }) => {
  return (
    <TabBoxWrapper w={1} active={active} {...other} onClick={onClick}>
      <CryptoIconImg src={image} active={active} />
      <CryptocyrrencyTitle active={active}>{children}</CryptocyrrencyTitle>
    </TabBoxWrapper>
  );
};

class Apply extends Component {
  state = {
    activeCurrencyType: 0,
    currencies: [
      { type: 0, title: 'Bitcoin', image: btcLogo },
      { type: 2, title: 'Ethereum', image: ethLogo }
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
          <ContentWrap w={[1, 870]} flexDirection="column">
            {applied ? (
              <Flex
                flex="1"
                w={1}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                style={{ height: '100%' }}
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
            * Disclaimer: The crypto value increase is dependent upon your own
            perception of the Bitcoin or Ethereum market values. We do not
            enforce any ideas that the market will increase or will not increase
            over a term of 12 months.
          </Disclaimer>
        </FlexContainer>

        <Footer w={1} alignItems="center" flexDirection={['row', 'column']}>
          <Flex w={[1, 870]} mt={55}>
            <Flex w={[1, 1 / 3]} flexDirection="column">
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
                <SVGContainer w={9} h={12} mr={10}>
                  <LocationIcon />
                </SVGContainer>
                <FooterText>
                  <strong>Toronto, ON, Canada</strong>
                </FooterText>
              </Flex>
            </Flex>
            <Flex w={[1, 1 / 3]} justifyContent="center">
              <Flex flexDirection="column">
                <FooterColumnHeading>Categories</FooterColumnHeading>
                <FooterLink href="#">Crypto Loans</FooterLink>
                <FooterLink href="#">Digital Wallet</FooterLink>
                <FooterLink href="#">Buy Bitcoin</FooterLink>
                <FooterLink href="#">Our Company</FooterLink>
                <FooterLink href="#">Contact Us</FooterLink>
              </Flex>
            </Flex>
            <Flex w={[1, 1 / 3]} flexDirection="column" alignItems="flex-end">
              <FooterColumnHeading style={{ paddingRight: 17 }}>
                Follow Us
              </FooterColumnHeading>
              <Flex alignItems="flex-start">
                <FooterSocialLink href="#">
                  <SVGContainer w={6} h={12}>
                    <FacebookIcon />
                  </SVGContainer>
                </FooterSocialLink>
                <FooterSocialLink href="#">
                  <SVGContainer w={20} h={12}>
                    <GoogleIcon />
                  </SVGContainer>
                </FooterSocialLink>
                <FooterSocialLink href="#">
                  <SVGContainer w={15} h={12}>
                    <TwitterIcon />
                  </SVGContainer>
                </FooterSocialLink>
                <FooterSocialLink href="#">
                  <SVGContainer w={13} h={12}>
                    <LinkedInIcon />
                  </SVGContainer>
                </FooterSocialLink>
              </Flex>
            </Flex>
          </Flex>
          <CopyrightBox w={870} mt={40} p={16}>
            {'© '}
            {new Date().getFullYear()}
            {' Loanzio. All Rights Reserved.'}
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
