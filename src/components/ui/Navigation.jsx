import React, { Fragment } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SVGContainer from './SVGContainer';
import { MenuIcon as MenuIconSVG } from './SVGIcons';
import { hide, show } from '../cssUtils';
import { handleNavMenuToggle } from '../../actions/ui';

const NavigationFlexWrap = styled(Flex)`
  height: 60px;
  background: #1F52C5;
  z-index: 2;

  @media only screen and (min-width: 767px) {
    height: 130px;
  }
`;

const LogoLoanz = styled.img`
  height: 100px;
  min-height: 100px;

  @media only screen and (max-width: 767px) {
    height: 50px;
    min-height: 50px;
    margin-left: 10px;
    margin-top: 5px;
  }
`;

const MobileMenu = styled(Box)`
  transition: all 0.3s ease-out;
  height: 0;
  overflow: hidden;

  @media only screen and (max-width: 767px) {
    ${show()};
    height: ${props => (props.open ? '360px' : 0)};
    background: #1F52C5;
  }

  @media only screen and (min-width: 767px) {
    ${hide()};
  }
`;

const DesktopMenu = styled(Flex)`
  @media only screen and (max-width: 767px) {
    ${hide()};
  }

  @media only screen and (min-width: 767px) {
    ${show()};
    text-align: right;
  }
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
  display: inline-block;

  &:last-child {
    margin-right: 0;
  }

  &.active {
    // border-bottom: 2px solid #ffffff;
  }

  @media only screen and (min-width: 767px) and (max-width: 1024px) {
    font-size: 17px;
    line-height: 17px;
    padding-right: 15px;
    padding-left: 0;
  }

  @media only screen and (max-width: 767px) {
    padding: 14px 25px;
    height: 60px;
    width: 100%;
    text-align: left;
  }
`;

const MenuIconBox = styled(Flex)`
  background: #1F52C5;
  height: 32px;
  border-radius: 3px;
  text-align: center;

  @media only screen and (min-width: 767px) {
    ${hide()};
    width: 0;
  }
`;

const MenuItems = () => (
  <Fragment>
    <NavItem href="/apply">Apply for a Crypto Loan</NavItem>
    <NavItem href="https://loanz.io/buy-bitcoin/">How to Buy or Sell Bitcoin</NavItem>
    <NavItem href="https://loanz.io/digital-wallet/">Digital Wallet</NavItem>
    <NavItem href="https://loanz.io/company/">Company</NavItem>
    <NavItem href="https://loanz.io/faqs/">FAQ's</NavItem>
    <NavItem href="https://loanz.io/contact-support/">Contact Us</NavItem>
  </Fragment>
);

const MenuIcon = ({ ...other }) => (
  <MenuIconBox
    w={34}
    justifyContent="center"
    alignItems="center"
    mr="5px"
    {...other}
  >
    <SVGContainer w={22} h={22}>
      <MenuIconSVG />
    </SVGContainer>
  </MenuIconBox>
);

const Navigation = ({ menuOpen, handleNavMenuToggle }) => (
  <Flex w={1} flexDirection="column">
    <NavigationFlexWrap
      w={1}
      justifyContent="space-between"
      alignItems="center"
      px={[10, 30]}
      py={[0, 15]}
    >
      <Flex alignItems="center" flexDirection="row">
        <a href="https://loanz.io/">
          <LogoLoanz
            src="https://loanz.io/wp-content/uploads/2018/03/loanzio-logo-bitcoinv4.png"
            data-retina="https://loanz.io/wp-content/uploads/2018/03/loanzio-logo-bitcoinv4.png"
          />
        </a>
      </Flex>
      <DesktopMenu w={[0, 1]} justifyContent="space-between">
        <MenuItems />
      </DesktopMenu>
      <MenuIcon onClick={handleNavMenuToggle} />
    </NavigationFlexWrap>
    <MobileMenu w={[1, 0]} flexDirection="column" open={menuOpen}>
      <MenuItems />
    </MobileMenu>
  </Flex>
);

export default connect(state => ({ menuOpen: state.ui.mobileMenuOpen }), {
  handleNavMenuToggle
})(Navigation);
