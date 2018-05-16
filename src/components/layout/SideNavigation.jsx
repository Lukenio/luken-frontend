import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SVGContainer from '../ui/SVGContainer';
import {
  BitcoinIcon,
  EthereumIcon,
  HomeIcon,
  LoanIcon,
  UserIcon,
  SupportIcon
} from '../ui/SVGIcons.jsx';

const WrapFlex = styled(Flex)`
  background: #3861BF;
  box-shadow: 1px 0 5px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: width 300ms ease-out;
  box-shadow: 1px 0 5px 0 rgba(0, 0, 0, 0.05);
  min-width: 80px;
  flex-shrink: 0;
`;

const StyledNavLink = styled(NavLink)`
  overflow: hidden;
  display: block;
  width: 195px;
  height: 70px;
  text-decoration: none;
  background: rgba(155, 155, 155, 0);
  border-bottom: 1px dotted #E1EDFA;

  &.active > div {
    height: 69px;
    background: #20528E;
  }
`;

const NavItem = styled(Flex)`
  height: 70px;
  padding: 25px;
  padding-right: 10px;
  color: #fff;
  margin: 0;
`;

const NavItemName = styled.span`
  display: inline-block;
  margin-left: 15px;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: ${props => (props.shown ? '#ffffff' : 'transparent')};
  letter-spacing: 0;
  line-height: 22px;
  transition: all 300ms ease-out;
  white-space: nowrap;
`;

const SideNavigation = ({ isOpen = true, didApplyKYC }) => (
  <WrapFlex width={isOpen ? 195 : 80} flexDirection="column">
    <Box>
      <StyledNavLink exact to="/a/btc">
        <NavItem alignItems="center">
          <SVGContainer w={28} h={28}>
            <BitcoinIcon />
          </SVGContainer>
          <NavItemName shown={isOpen}>Bitcoin</NavItemName>
        </NavItem>
      </StyledNavLink>
    </Box>
    <Box>
      <StyledNavLink exact to="/a/eth">
        <NavItem alignItems="center">
          <SVGContainer w={28} h={28}>
            <EthereumIcon />
          </SVGContainer>
          <NavItemName shown={isOpen}>Ethereum</NavItemName>
        </NavItem>
      </StyledNavLink>
    </Box>
    <Box>
      <StyledNavLink exact to="/loans">
        <NavItem alignItems="center">
          <SVGContainer w={28} h={28}>
            <LoanIcon />
          </SVGContainer>
          <NavItemName shown={isOpen}>Crypto Loans</NavItemName>
        </NavItem>
      </StyledNavLink>
    </Box>
    <Box>
      <StyledNavLink exact to="/profile">
        <NavItem alignItems="center">
          <SVGContainer w={28} h={28}>
            <UserIcon />
          </SVGContainer>
          <NavItemName shown={isOpen}>My Profile</NavItemName>
        </NavItem>
      </StyledNavLink>
    </Box>
    <Box>
      <StyledNavLink exact to="/support">
        <NavItem alignItems="center">
          <SVGContainer w={28} h={28}>
            <SupportIcon />
          </SVGContainer>
          <NavItemName shown={isOpen}>Contact Support</NavItemName>
        </NavItem>
      </StyledNavLink>
    </Box>
    {false && !didApplyKYC && (
      <Box>
        <StyledNavLink exact to="/kyc">
          <NavItem alignItems="center">
            <SVGContainer w={28} h={28}>
              <HomeIcon />
            </SVGContainer>
            <NavItemName shown={isOpen}>KYC</NavItemName>
          </NavItem>
        </StyledNavLink>
      </Box>
    )}
  </WrapFlex>
);

const mapStateToProps = state => ({
  isOpen: state.ui.sideMenuOpen,
  didApplyKYC: state.userAccount.kyc_applied
});

export default withRouter(connect(mapStateToProps)(SideNavigation));
