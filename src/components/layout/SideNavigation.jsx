import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { BitcoinIcon, EthereumIcon } from '../ui/SVGIcons.jsx';
import SVGContainer from '../ui/SVGContainer';

const WrapFlex = styled(Flex)`
  background: #9b9b9b;
  overflow: hidden;
  transition: width 300ms ease-out;
  box-shadow: 1px 0 5px 0 rgba(0, 0, 0, 0.05);
  min-width: 80px;
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  width: 195px;
  height: 70px;
  text-decoration: none;

  &.active > div {
    background: #4a4a4a;
  }
`;

const NavItem = styled(Flex)`
  height: 70px;
  padding: 25px 30px;
  color: #fff;
  margin: 0;
`;

const NavItemName = styled.span`
  display: inline-block;
  margin-left: 9px;
  font-family: Montserrat-Medium;
  font-size: 14px;
  color: ${props => (props.shown ? '#ffffff' : 'transparent')};
  letter-spacing: 0;
  line-height: 22px;
  transition: all 300ms ease-out;
`;

const SideNavigation = ({ isOpen = true }) => (
  <WrapFlex width={isOpen ? 195 : 80} flexDirection="column">
    <Box>
      <StyledNavLink exact to="/a/btc">
        <NavItem alignItems="center">
          <SVGContainer w={20} h={20}>
            <BitcoinIcon />
          </SVGContainer>
          <NavItemName shown={isOpen}>Bitcoin</NavItemName>
        </NavItem>
      </StyledNavLink>
    </Box>
    <Box>
      <StyledNavLink exact to="/a/eth">
        <NavItem alignItems="center">
          <SVGContainer w={20} h={20}>
            <EthereumIcon />
          </SVGContainer>
          <NavItemName shown={isOpen}>Ethereum</NavItemName>
        </NavItem>
      </StyledNavLink>
    </Box>
  </WrapFlex>
);

const mapStateToProps = state => ({
  isOpen: state.ui.sideMenuOpen
});

export default withRouter(connect(mapStateToProps)(SideNavigation));
