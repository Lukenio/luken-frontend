import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { Link } from 'react-router-dom';

const Logo = styled.img`
  width: 38px;
  height: 34px;
  margin-left: 20px;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-left: 40px;
`;

const VersionTag = styled.p`
  color: #fff;
  font: italic 12px 'Roboto', sans-serif;
  margin-left: 40px;
`;

const Footer = ({ className }) => (
  <Flex
    className={className}
    justify='space-between'
    align='center'
    width={1}
    px={40}
  >
    <Flex align='center'>
      <span>SoundUnite 2017 all rights reserved</span>
      <StyledLink to="#">Privacy Policy</StyledLink>
      { 
        process.env.REACT_APP_BUILD_TAG ? 
        (<VersionTag>Build: {process.env.REACT_APP_BUILD_TAG}</VersionTag>) : null
      }
    </Flex>
    <Flex align='center'>
      <span>Powered by:</span>
      <Logo src='/audioworks-logo-2x.png'/>
    </Flex>
  </Flex>
);

const StyledFooter = styled(Footer)`
  height: 74px;
  background: #5E5E5E;
  color: #fff;
  font-size: 12px;
  align-self: flex-end;
`;

export default StyledFooter;
