import React, { Component, Fragment } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import dataFetchCoinsPrice from '../actions/coinsPrice';
import SVGContainer from '../components/ui/SVGContainer';
import { FlexContainer } from '../components/ui/Containers';
import BTCApplyForm from '../components/apply/forms/BTCApplyForm';
import ETHApplyForm from '../components/apply/forms/ETHApplyForm';
import { PlaceholderImage } from '../components/ui/Placeholders';

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

const Header = styled(Flex)`
  height: 130px;
  background: #2893ef;
`;

const Footer = styled(Flex)`
  height: 297px;
  background: #323b45;
`;

const Navigation = styled(Flex)`
  height: 130px;
  width: 100%;
`;

const ContentWrap = styled(Box)`
  background: #ffffff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  height: 642px;
`;

const NavItem = styled.a`
  font-size: 20px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 22px;
  padding: 5px 20px;
  text-decoration: none;

  &:last-child {
    margin-right: 0;
  }

  &.active {
    // border-bottom: 2px solid #ffffff;
  }
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

const LogoLoanz = styled.img`
  height: 100px;
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

const Icon = ({ children, h, ...other }) => (
  <SVGContainer style={{ height: h }} {...other}>
    {children}
  </SVGContainer>
);

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
        <Header w={1} flexDirection="column">
          <Navigation
            justifyContent="space-between"
            alignItems="center"
            px={30}
            py={15}
          >
            <Flex alignItems="center" flexDirection="row">
              {/* <PlaceholderImage size={40} /> */}
              <LogoLoanz
                src="https://loanz.io/wp-content/uploads/2018/03/bitcoin-loans-for-crypto-blocks2.png"
                data-retina="https://loanz.io/wp-content/uploads/2018/03/bitcoin-loans-for-crypto-blocks2.png"
              />
            </Flex>
            <Box>
              <NavItem href="/apply">Apply for a loan</NavItem>
              <NavItem href="https://loanz.io/buy-bitcoin">Buy Bitcoin</NavItem>
              <NavItem href="https://loanz.io/wallet">Digital Wallet</NavItem>
              <NavItem href="https://loanz.io/company">Company</NavItem>
              <NavItem href="https://loanz.io/faq">FAQ's</NavItem>
              <NavItem href="https://loanz.io/contact">Contact Us</NavItem>
            </Box>
          </Navigation>
        </Header>

        <FlexContainer
          alignItems="center"
          justifyContent="center"
          w={10}
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
          w={1}
          my={10}
          centered={true}
        >
          <ContentWrap w={870} flexDirection="column">
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
          w={10}
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

        <Footer w={1} alignItems="center" flexDirection="column">
          <Flex w={870} mt={55}>
            <Flex w={1 / 3} flexDirection="column">
              <FooterColumnHeading>Contact Us</FooterColumnHeading>
              <Flex alignItems="center" mb="8px">
                <Icon w={12} h={12} mr={10}>
                  <PhoneIcon />
                </Icon>
                <FooterText style={{ marginRight: 5 }}>Toll Free:</FooterText>
                {'  '}
                <FooterLink href="tel:1-833-534-2255">
                  1-833-534-2255
                </FooterLink>
              </Flex>
              <Flex alignItems="center" mb="8px">
                <Icon w={12} h={9} mr={10}>
                  <EmailIcon />
                </Icon>
                <FooterLink href="mailto:info@loanz.io">
                  info@loanz.io
                </FooterLink>
              </Flex>
              <Flex alignItems="center" mb="8px">
                <Icon w={9} h={12} mr={10}>
                  <LocationIcon />
                </Icon>
                <FooterText>
                  <strong>Toronto, ON, Canada</strong>
                </FooterText>
              </Flex>
            </Flex>
            <Flex w={1 / 3} justifyContent="center">
              <Flex flexDirection="column">
                <FooterColumnHeading>Categories</FooterColumnHeading>
                <FooterLink href="#">Crypto Loans</FooterLink>
                <FooterLink href="#">Digital Wallet</FooterLink>
                <FooterLink href="#">Buy Bitcoin</FooterLink>
                <FooterLink href="#">Our Company</FooterLink>
                <FooterLink href="#">Contact Us</FooterLink>
              </Flex>
            </Flex>
            <Flex w={1 / 3} flexDirection="column" alignItems="flex-end">
              <FooterColumnHeading style={{ paddingRight: 17 }}>
                Follow Us
              </FooterColumnHeading>
              <Flex alignItems="flex-start">
                <FooterSocialLink href="#">
                  <Icon w={6} h={12}>
                    <FacebookIcon />
                  </Icon>
                </FooterSocialLink>
                <FooterSocialLink href="#">
                  <Icon w={20} h={12}>
                    <GoogleIcon />
                  </Icon>
                </FooterSocialLink>
                <FooterSocialLink href="#">
                  <Icon w={15} h={12}>
                    <TwitterIcon />
                  </Icon>
                </FooterSocialLink>
                <FooterSocialLink href="#">
                  <Icon w={13} h={12}>
                    <LinkedInIcon />
                  </Icon>
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
