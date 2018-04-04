import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  color: #9b9b9b;

  text-decoration: none;
  margin-right: 15px;
`;

const StyledFlex = styled(Flex)`
  height: 19px;
  font-size: 12px;
  color: #9b9b9b;
  letter-spacing: 0;
  line-height: 19px;
  align-self: flex-end;
`;

const Footer = ({ className }) => (
  <StyledFlex
    className={className}
    justifyContent="space-between"
    alignItems="center"
    width={1}
    mt={25}
  >
    <Flex alignItems="center">
      <StyledLink to="#">Privacy</StyledLink>
      <StyledLink to="#">Terms of Service</StyledLink>
      <StyledLink to="#">Support</StyledLink>
      <StyledLink to="#">Contact Us</StyledLink>
    </Flex>
    <span>
      Copyright © {new Date().getFullYear()} Cryptocurrency Wallet . All rights
      reserved.
    </span>
  </StyledFlex>
);

export default Footer;
