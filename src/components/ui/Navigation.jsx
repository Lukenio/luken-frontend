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
    height: 110px;
  }
`;

const LogoLoanz = styled.img`
  height: 80px;
  min-height: 80px;

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
  font-size: 18px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 22px;
  padding: 5px 20px;
  text-decoration: none;
  display: inline-block;
  transition: all .3s ease-in-out;

  &:last-child {
    margin-right: 0;
  }

  &.active {
    // border-bottom: 2px solid #ffffff;
  }

  &:hover {
    color: #ffca0f;
  }

  @media only screen and (min-width: 767px) and (max-width: 1049px) {
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

const NavItemButton = NavItem.extend`
  @media (min-width: 960px) {
    padding: 11px 20px;
    line-height: 21px;
    background-color: #f7f7f7;
    color: #3d3d3d;
    border-radius: 5px;
    transition: none;
  
    &:hover {
      background-color: #EAEAEA;
      color: #3d3d3d;
    }
  }

  @media (min-width: 1060px) {
    margin-left: 10px;
  }

  @media (min-width: 1100px) {
    margin-left: 20px;
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
    <NavItem href="https://loanz.io/buy-bitcoin/">Buy Bitcoin</NavItem>
    <NavItem href="https://loanz.io/faqs/">FAQ’s</NavItem>
    <NavItem href="https://loanz.io/blog/">Blog</NavItem>
    <NavItem href="https://loanz.io/contact-support/">Contact Us</NavItem>
    <NavItemButton href="/login">My Account</NavItemButton>
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
            src="/images/logo-bitcoinv4.png"
            data-retina="/images/logo-bitcoinv4.png"
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
